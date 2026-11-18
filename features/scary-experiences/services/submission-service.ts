import type {ExperienceCategoryValue} from '../lib/constants';

/**
 * Submission boundary for «تجربیات ترسناک من».
 *
 * The project has no backend, API route, or database, so nothing is stored by default and this
 * service reports `not-configured` instead of pretending to succeed. To connect a real backend,
 * set `NEXT_PUBLIC_SCARY_EXPERIENCES_ENDPOINT` to an HTTPS endpoint that accepts the JSON body
 * below via POST and replies with any 2xx status (optionally `{ "id": "..." }`).
 * Swapping this module for a Server Action or an internal API route keeps the same contract.
 */

export type ScaryExperienceSubmission = {
    title: string;
    body: string;
    /** `null` means the visitor chose to stay anonymous. */
    alias: string | null;
    category: ExperienceCategoryValue;
    /** The visitor confirmed the story is theirs or that they may share it. */
    consent: true;
    /** Name of the uploaded .txt file, when the text came from one. */
    sourceFileName: string | null;
    submittedAt: string;
};

export type SubmissionResult =
    | {status: 'success'; id: string | null}
    | {status: 'not-configured'}
    | {status: 'error'; message: string};

const ENDPOINT = process.env.NEXT_PUBLIC_SCARY_EXPERIENCES_ENDPOINT?.trim() ?? '';
const TIMEOUT_MS = 15_000;

export const isSubmissionConfigured = ENDPOINT.length > 0;

export async function submitScaryExperience(
    submission: ScaryExperienceSubmission,
): Promise<SubmissionResult> {
    if (!isSubmissionConfigured) return {status: 'not-configured'};

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify(submission),
            signal: controller.signal,
        });

        if (!response.ok) {
            return {
                status: 'error',
                message:
                    response.status === 429
                        ? 'تعداد ارسال‌ها زیاد بوده. چند دقیقه دیگه دوباره امتحان کن.'
                        : 'سرور تجربه‌ت رو نپذیرفت. کمی بعد دوباره امتحان کن.',
            };
        }

        let id: string | null = null;
        try {
            const data: unknown = await response.json();
            if (data && typeof data === 'object' && 'id' in data && typeof data.id === 'string') {
                id = data.id;
            }
        } catch {
            // A 2xx response without a JSON body still counts as accepted.
        }

        return {status: 'success', id};
    } catch (error) {
        const timedOut = error instanceof DOMException && error.name === 'AbortError';
        return {
            status: 'error',
            message: timedOut
                ? 'پاسخ سرور خیلی طول کشید. اتصالت رو بررسی کن و دوباره بفرست.'
                : 'ارتباط با سرور برقرار نشد. اتصال اینترنتت رو بررسی کن و دوباره امتحان کن.',
        };
    } finally {
        clearTimeout(timer);
    }
}
