'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import { UploadCloud, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewProjectModal({ open, onClose }: NewProjectModalProps) {
  const router = useRouter();
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [experienceWeight, setExperienceWeight] = useState(5);
  const [projectsWeight, setProjectsWeight] = useState(5);
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progressText, setProgressText] = useState('Create Project');
  const coffeeTimer = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
      if (coffeeTimer.current) clearTimeout(coffeeTimer.current);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResumeFiles(Array.from(e.target.files));
    }
  };

  const handleFileDelete = (index: number) => {
    setResumeFiles((files) => files.filter((_, i) => i !== index));
  };

  const clearPolling = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
    if (coffeeTimer.current) {
      clearTimeout(coffeeTimer.current);
      coffeeTimer.current = null;
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setExperienceWeight(5);
    setProjectsWeight(5);
    setResumeFiles([]);
    setUploading(false);
    setProgressText('Create Project');
    clearPolling();
  };

  const handleCancel = () => {
    clearPolling();
    toast.info('🚫 Processing Cancelled.', { position: 'top-right' });
    resetForm();
    onClose();
    router.push('/dashboard/recruiter');
  };

  const startPollingModelStatus = (jobId: string, token: string) => {
    let retries = 0;
    const maxRetries = 100;   // up to ~16 minutes
    const intervalMs = 10000;  // poll every 10 seconds

    // After 30 seconds, show the coffee message
    coffeeTimer.current = setTimeout(() => {
      setProgressText('Still working… grab a coffee ☕');
    }, 30000);

    pollingInterval.current = setInterval(async () => {
      retries += 1;
      try {
        const res = await fetch(`http://localhost:8000/status?job_id=${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Status fetch failed');

        const { status } = await res.json();
        if (status === 'complete') {
          clearPolling();
          toast.success('✅ Resume Processing Complete.', { position: 'top-right' });
          resetForm();
          onClose();
          router.push(`/dashboard/recruiter/results/${jobId}`);
        } else {
          setProgressText('Ranking Candidates…');
        }
      } catch (err) {
        if (retries >= maxRetries) {
          clearPolling();
          toast.error('⏱️ Processing timed out. Please try again.', { position: 'top-right' });
          resetForm();
          onClose();
        }
      }
    }, intervalMs);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || resumeFiles.length === 0) {
      toast.error('Please fill all fields and upload a resume ZIP.', { position: 'top-right' });
      return;
    }

    setUploading(true);
    setProgressText('Uploading Resumes…');

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const token = session.access_token;
      const formData = new FormData();
      formData.append('job_title', title);
      formData.append('job_description', description);
      formData.append('weight_experience', experienceWeight.toString());
      formData.append('weight_projects', projectsWeight.toString());
      formData.append('file', resumeFiles[0]);

      const res = await fetch('http://localhost:8000/upload-resumes/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const { job_id } = await res.json();
      toast.success('✅ Upload Successful! Processing started.', { position: 'top-right' });
      setProgressText('Parsing Resumes…');

      // Give backend a head start
      setTimeout(() => {
        startPollingModelStatus(job_id, token);
      }, 5000);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload error. Try again.', { position: 'top-right' });
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, background: '#111', color: '#eee' }}>
        Create New Project
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          backgroundColor: '#111',
          backdropFilter: 'blur(10px)',
          py: 3,
        }}
      >
        <TextField
          label="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 2,
            input: { color: '#eee' },
          }}
        />
        <TextField
          label="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
          sx={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 2,
            input: { color: '#eee' },
          }}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            label="Experience Weight"
            type="number"
            value={experienceWeight}
            onChange={(e) => setExperienceWeight(Number(e.target.value))}
            sx={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 2,
              input: { color: '#eee' },
            }}
          />
          <TextField
            label="Projects Weight"
            type="number"
            value={projectsWeight}
            onChange={(e) => setProjectsWeight(Number(e.target.value))}
            sx={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 2,
              input: { color: '#eee' },
            }}
          />
        </Stack>
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: '#1a1a1a',
            border: '2px dashed #555',
            borderRadius: 3,
            cursor: 'pointer',
            color: '#aaa',
            '&:hover': { backgroundColor: '#222' },
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <UploadCloud size={32} style={{ marginBottom: 8 }} />
          <Typography>Upload Resume ZIP</Typography>
          <input id="file-input" type="file" multiple hidden onChange={handleFileChange} />
        </Box>
        {resumeFiles.length > 0 && (
          <Stack spacing={1} direction="row" flexWrap="wrap">
            {resumeFiles.map((file, index) => (
              <Chip
                key={index}
                label={file.name}
                variant="outlined"
                onDelete={() => handleFileDelete(index)}
                deleteIcon={<X />}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: '#eee',
                  borderColor: '#555',
                }}
              />
            ))}
          </Stack>
        )}
      </DialogContent>
      <DialogActions sx={{ background: '#111', p: 2 }}>
        <Button onClick={onClose} disabled={uploading}>
          Close
        </Button>
        {uploading && (
          <Button variant="outlined" color="error" onClick={handleCancel}>
            Cancel Processing
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={uploading}
          sx={{
            backgroundColor: '#3b82f6',
            '&:hover': { backgroundColor: '#2563eb' },
            fontWeight: 700,
            borderRadius: 2,
          }}
        >
          {uploading ? progressText : 'Create Project'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
