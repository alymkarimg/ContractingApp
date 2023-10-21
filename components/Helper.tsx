import DOMPurify from 'dompurify';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useToasts = (
  success: string | null,
  setSuccess: Dispatch<SetStateAction<string | null>>,
  error: string | null,
  setError: Dispatch<SetStateAction<string | null>>
) => {
  useEffect(() => {
    if (error) toast.error(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(error) }} />);
    // reset toast
    setError(null);
  }, [error, setError]);

  useEffect(() => {
    if (success) toast.success(<ul dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(success) }} />);
    // reset toast
    setSuccess(null);
  }, [setSuccess, success]);
};
