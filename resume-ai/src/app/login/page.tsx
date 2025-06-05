'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Slide,
  Grid,
  CircularProgress,
  GlobalStyles,
} from '@mui/material';
import { Mail, User, Briefcase, Lock } from 'lucide-react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import zxcvbn from 'zxcvbn';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { framerTransition } from '@/theme/ThemeProvider';

/* ——— primary action ——— */
function GlowButton(
  props: React.ComponentProps<typeof Button> & { loading?: boolean },
) {
  const { loading, children, ...rest } = props;
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Button
        {...rest}
        fullWidth
        disabled={loading || rest.disabled}
        sx={{
          py: 1.35,
          fontWeight: 600,
          letterSpacing: 0.3,
          background: 'linear-gradient(90deg,#16c7b2 0%,#6772ff 100%)',
          color: '#fff',
          transition: 'transform .25s,box-shadow .25s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(103,114,255,.35)',
            background: 'linear-gradient(90deg,#1ed1bb 0%,#7d86ff 100%)',
          },
          '&:active': { transform: 'translateY(0)', boxShadow: '0 4px 12px rgba(103,114,255,.25)' },
        }}
      >
        <Box sx={{ opacity: loading ? 0 : 1 }}>{children}</Box>
      </Button>
      {loading && (
        <CircularProgress size={22} sx={{ position: 'absolute', inset: 0, m: 'auto', color: '#fff' }} />
      )}
    </Box>
  );
}

const meterColors = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#10b981'];
const meterLabel = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];

export default function AuthPage() {
  const router = useRouter();
  const [variant, setVariant] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const firstRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    role: 'student',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  useEffect(() => firstRef.current?.focus(), [variant]);

  /* password meter (signup only) */
  const { score, label } = (() => {
    if (!form.password) return { score: 0, label: '' };
    const { score } = zxcvbn(form.password);
    return { score, label: meterLabel[score] };
  })();

  /* submit */
  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    const { firstName, lastName, role, email, password, confirmPassword } = form;

    if (!email || !password) return err('Email & password required');
    if (variant === 'signup' && password !== confirmPassword) return err('Passwords must match');

    try {
      let uid: string;
      if (variant === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        uid = data.user.id;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: `${firstName} ${lastName}`, role } },
        });
        if (error) throw error;
        uid = data.user!.id;
        await supabase.from('users').upsert({ user_id: uid, email, name: `${firstName} ${lastName}`, role });
      }
      const { data } = await supabase.from('users').select('role').eq('user_id', uid).maybeSingle();
      router.push(data?.role === 'recruiter' ? '/dashboard/recruiter' : '/dashboard/student');
    } catch (e: any) {
      err(e.message ?? 'Error');
    } finally {
      setLoading(false);
    }
  };
  const err = (m: string) => (setToast(m), setLoading(false));

  return (
    <>
      {/* remove blue autofill */}
      <GlobalStyles
        styles={{
          'input:-webkit-autofill, textarea:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #111214 inset',
            WebkitTextFillColor: '#fff',
          },
        }}
      />

      <Box
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        sx={{
          minHeight: '100dvh',
          background: '#0b0b0d',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          position: 'relative',
        }}
      >
        {/* ─── ink blobs ─── */}
        <Box
          sx={{
            position: 'absolute',
            width: 600,
            height: 600,
            top: '-15%',
            left: '-10%',
            background: 'rgba(103,114,255,.38)',
            borderRadius: '45% 55% 60% 40%',
            filter: 'blur(140px)',
            animation: 'morph 26s ease-in-out infinite',
            '@keyframes morph': {
              '0%': { borderRadius: '45% 55% 60% 40%', transform: 'rotate(0deg)' },
              '50%': { borderRadius: '60% 40% 45% 55%', transform: 'rotate(45deg)' },
              '100%': { borderRadius: '45% 55% 60% 40%', transform: 'rotate(0deg)' },
            },
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 500,
            height: 500,
            bottom: '-18%',
            right: '-12%',
            background: 'rgba(22,199,178,.35)',
            borderRadius: '50% 50% 40% 60%',
            filter: 'blur(140px)',
            animation: 'morph2 32s ease-in-out infinite',
            '@keyframes morph2': {
              '0%': { borderRadius: '50% 50% 40% 60%', transform: 'rotate(0deg)' },
              '50%': { borderRadius: '35% 65% 55% 45%', transform: 'rotate(-40deg)' },
              '100%': { borderRadius: '50% 50% 40% 60%', transform: 'rotate(0deg)' },
            },
            pointerEvents: 'none',
          }}
        />

        {/* word-mark */}
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: 24,
            left: 32,
            fontFamily: 'var(--font-jakarta)',
            fontWeight: 600,
            letterSpacing: -0.5,
            background: 'linear-gradient(90deg,#16c7b2 0%,#6772ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            zIndex: 3,
          }}
        >
          Mock’n-Hire
        </Typography>

        {/* card */}
        <Paper
          component={motion.form}
          layout
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: framerTransition }}
          whileHover={{ scale: 1.015, boxShadow: '0 12px 40px rgba(0,0,0,.55)' }}
          sx={{
            width: '100%',
            maxWidth: 520,
            p: 4,
            borderRadius: 3,
            background: '#111214',
            display: 'grid',
            gap: 3,
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              padding: '1px',
              borderRadius: 3,
              background:
                'linear-gradient(135deg,rgba(20,184,166,.85),rgba(99,102,241,.85))',
              WebkitMask:
                'linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              pointerEvents: 'none',
            },
          }}
        >
          <Typography variant="h4" sx={{ fontFamily: 'var(--font-jakarta)', fontWeight: 600, textAlign: 'center' }}>
            {variant === 'login' ? 'Sign in' : 'Create account'}
          </Typography>

          {variant === 'signup' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First name"
                  name="firstName"
                  value={form.firstName}
                  onChange={onChange}
                  inputRef={firstRef}
                  fullWidth
                  InputProps={{ startAdornment: <InputAdornment position="start"><User size={18} /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last name"
                  name="lastName"
                  value={form.lastName}
                  onChange={onChange}
                  fullWidth
                  InputProps={{ startAdornment: <InputAdornment position="start"><User size={18} /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Role"
                  select
                  name="role"
                  value={form.role}
                  onChange={onChange}
                  fullWidth
                  InputProps={{ startAdornment: <InputAdornment position="start"><Briefcase size={18} /></InputAdornment> }}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="recruiter">Recruiter</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            inputRef={variant === 'login' ? firstRef : undefined}
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={18} /></InputAdornment> }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPwd ? 'text' : 'password'}
            value={form.password}
            onChange={onChange}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock size={18} /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPwd(!showPwd)} edge="end">
                    <motion.div animate={{ rotate: showPwd ? 180 : 0 }}>
                      {showPwd ? <VisibilityOff /> : <Visibility />}
                    </motion.div>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {variant === 'signup' && form.password && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: -1 }}>
              <Box sx={{ flex: 1, height: 6, borderRadius: 3, background: meterColors[score] }} />
              <Typography variant="caption" sx={{ color: meterColors[score] }}>
                {label}
              </Typography>
            </Box>
          )}

          {variant === 'signup' && (
            <TextField
              label="Confirm password"
              name="confirmPassword"
              type={showPwd ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={onChange}
              fullWidth
              InputProps={{ startAdornment: <InputAdornment position="start"><Lock size={18} /></InputAdornment> }}
            />
          )}

          <GlowButton loading={loading} type="submit">
            {variant === 'login' ? 'Sign in' : 'Create account'}
          </GlowButton>

          <Button
            variant="text"
            disabled={loading}
            onClick={() => setVariant(variant === 'login' ? 'signup' : 'login')}
            sx={{
              textTransform: 'none',
              mt: -1,
              color: 'text.secondary',
              position: 'relative',
              transition: 'color .25s',
              '&:hover': {
                color: '#7d86ff',
                '&:after': { width: '100%', opacity: 1 },
              },
              '&:after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: -2,
                height: 2,
                width: 0,
                opacity: 0,
                background: 'linear-gradient(90deg,#16c7b2 0%,#6772ff 100%)',
                transition: 'width .25s,opacity .25s',
              },
            }}
          >
            {variant === 'login' ? 'Create an account' : 'Already have an account? Sign in'}
          </Button>
        </Paper>

        <Snackbar
          open={!!toast}
          onClose={() => setToast('')}
          autoHideDuration={4000}
          message={toast}
          TransitionComponent={(p) => <Slide {...p} direction="left" />}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
      </Box>
    </>
  );
}
