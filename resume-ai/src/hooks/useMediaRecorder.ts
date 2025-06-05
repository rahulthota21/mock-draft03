'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseRecorderOptions {
  mimeType?: string; // default video/webm;codecs=vp9,opus
  onData: (blob: Blob) => void;
}

export function useMediaRecorder({ mimeType, onData }: UseRecorderOptions) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);

  /* init stream once */
  useEffect(() => {
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
        });
        setStream(s);
      } catch (e) {
        console.error('Could not access media devices', e);
      }
    })();
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  /* start */
  const start = useCallback(() => {
    if (!stream) return;
    const rec = new MediaRecorder(stream, {
      mimeType: mimeType ?? 'video/webm;codecs=vp9,opus',
    });
    rec.ondataavailable = (e) => e.data.size && onData(e.data);
    rec.start();
    recorderRef.current = rec;
    setRecording(true);
  }, [stream, mimeType, onData]);

  /* stop */
  const stop = useCallback(() => {
    recorderRef.current?.stop();
    setRecording(false);
  }, []);

  return { stream, recording, start, stop };
}
