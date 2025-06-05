'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Chip,
  Avatar,
  useTheme,
  IconButton,
  Stack,
  Tooltip,
  Fade,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  ClipboardList,
  Clock,
  Bell,
  Plus,
  Settings,
  LayoutDashboard,
  FileEdit,
  Eye,
  Trash2,
  Download,
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import NewProjectModal from './NewProjectModal';

export default function RecruiterDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const theme = useTheme();
  const router = useRouter();

  // Fetch all projects (job_descriptions table)
  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_descriptions')        // ← updated table name
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching projects:', error);
    }
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Compute aggregate analytics
  const totalProjects = projects.length;
  const totalResumes = projects.reduce((sum, p) => sum + (p.resumes || 0), 0);
  const shortlisted = projects.reduce((sum, p) => sum + (p.shortlisted || 0), 0);
  const waitlisted = projects.reduce((sum, p) => sum + (p.waitlisted || 0), 0);

  const analytics = [
    { icon: BarChart3, label: 'Total Projects', value: totalProjects },
    { icon: Users, label: 'Candidates', value: totalResumes },
    { icon: ClipboardList, label: 'Shortlisted', value: shortlisted },
    { icon: Clock, label: 'Waitlisted', value: waitlisted },
  ];

  const handleNewProject = (data: any) => {
    console.log('📦 New Project Created:', data);
    fetchProjects();
  };

  // Styles
  const cardBg = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const borderColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const hoverShadow =
    theme.palette.mode === 'dark' ? '0 14px 44px rgba(0,0,0,0.5)' : '0 10px 32px rgba(0,0,0,0.08)';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          backgroundColor: cardBg,
          borderRight: `1px solid ${borderColor}`,
          px: 3,
          py: 4,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '0 1rem 1rem 0',
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h6" fontWeight={700} fontFamily="'Playfair Display', serif">
            Mock’n-Hire
          </Typography>
          <Stack spacing={2}>
            <Button startIcon={<LayoutDashboard size={18} />} variant="text" sx={{ justifyContent: 'flex-start' }}>
              Dashboard
            </Button>
            <Button startIcon={<Users size={18} />} variant="text" sx={{ justifyContent: 'flex-start' }}>
              Talent Pool
            </Button>
            <Button startIcon={<Settings size={18} />} variant="text" sx={{ justifyContent: 'flex-start' }}>
              Settings
            </Button>
          </Stack>
        </Stack>
        <Box textAlign="center">
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Mock’n-Hire
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex={1} sx={{ py: 5, px: { xs: 3, md: 6 } }}>
        {/* Top Bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Box>
            <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ fontFamily: 'Inter' }}>
              Welcome back 👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Here's your summary and ongoing projects.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip title="Notifications">
              <IconButton size="small" sx={{ backgroundColor: cardBg }}>
                <Bell size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <Avatar alt="Recruiter Avatar" src="/images/avatar.png" sx={{ width: 36, height: 36 }} />
            </Tooltip>
          </Stack>
        </Box>

        {/* Analytics Grid */}
        <Grid container spacing={3} mb={6}>
          {analytics.map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Paper
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: hoverShadow,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box mb={1} display="flex" alignItems="center" gap={1}>
                  <item.icon size={20} color={theme.palette.primary.main} />
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={800} fontFamily="'Satoshi', sans-serif">
                  +{item.value.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Projects Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            Projects
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Plus size={18} />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            onClick={() => setModalOpen(true)}
          >
            New Project
          </Button>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {/* Project List */}
        {loading ? (
          <Typography>Loading…</Typography>
        ) : projects.length === 0 ? (
          <Fade in>
            <Box textAlign="center" mt={10}>
              <ClipboardList size={48} color={theme.palette.text.secondary} />
              <Typography variant="h6" color="text.secondary" mt={3}>
                You haven’t created any projects yet.
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Start by creating a new project and uploading resumes to begin AI screening.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                onClick={() => setModalOpen(true)}
              >
                Create Your First Project
              </Button>
            </Box>
          </Fade>
        ) : (
          <Grid container spacing={4}>
            {projects.map((proj: any) => (
              <Grid item xs={12} sm={6} md={4} key={proj.job_id}>
                <Paper
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 260 }}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    backgroundColor: cardBg,
                    border: `1px solid ${borderColor}`,
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: hoverShadow,
                      transform: 'translateY(-2px)',
                    },
                  }}
                  onClick={() => router.push(`/dashboard/recruiter/results/${proj.job_id}`)}
                >
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    {proj.job_title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {proj.created_at?.split('T')[0] || ''}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">{proj.resumes} resumes</Typography>
                    <Chip
                      label={proj.status || 'Pending'}
                      color={proj.status === 'Completed' ? 'success' : 'warning'}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Stack direction="row" spacing={1} justifyContent="flex-end" mt={2}>
                    <Tooltip title="Download CSV">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          const link = document.createElement('a');
                          link.href = `http://localhost:8000/export?job_id=${proj.job_id}&format=csv`;
                          link.download = `results-${proj.job_id}.csv`;
                          link.click();
                        }}
                      >
                        <Download size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                        <FileEdit size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                        <Trash2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Modal */}
      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleNewProject} />
    </Box>
  );
}
