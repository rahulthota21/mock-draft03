/* ---------------------------------------------------------------------------
 * File: src/app/dashboard/recruiter/results/page.tsx
 *  - unreviewed status + grey pill
 *  - local filter & search box
 *  - candidate_name column (fallback = stripped file name)
 *  - FIXED: tab → activeTab, no more runtime error
 * ------------------------------------------------------------------------ */
"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Avatar,
  Chip,
  Tooltip,
  Button,
  Stack,
  Divider,
  Snackbar,
  IconButton,
  Slide,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Document, Page as PdfPage, pdfjs } from "react-pdf";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { toast } from "react-hot-toast";
import { CheckCircle, Hourglass, XCircle } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

/* ─── Types ───────────────────────────────────────────────────────────── */
type Status = "unreviewed" | "shortlisted" | "waitlisted" | "rejected";

interface ResumeData {
  resume_id: string;
  file_name: string;
  candidate_name: string;
  file_path: string;
  status: Status;
  total_score: number;
  rank: number;
  analysis: {
    key_skills: string[];
    certifications_courses: string[];
    relevant_projects: string[];
    soft_skills: string[];
    overall_analysis: string;
    overall_match_score: number;
    projects_relevance_score: number;
    experience_relevance_score: number;
  };
}

/* ─── UI tokens ───────────────────────────────────────────────────────── */
const CLR: Record<Status, string> = {
  unreviewed: "#9ca3af",
  shortlisted: "#4ade80",
  waitlisted: "#facc15",
  rejected: "#f87171",
};
const ICON: Record<Status, React.ReactNode> = {
  unreviewed: <Hourglass size={16} />,
  shortlisted: <CheckCircle size={16} />,
  waitlisted: <Hourglass size={16} />,
  rejected: <XCircle size={16} />,
};
const statusOptions: Status[] = [
  "unreviewed",
  "shortlisted",
  "waitlisted",
  "rejected",
];

/* ─── Helpers ─────────────────────────────────────────────────────────── */
const stripExt = (f: string) => f.replace(/\.[^/.]+$/, "");

/* ─── Component ───────────────────────────────────────────────────────── */
export default function ResultsPage() {
  const { jobId } = useParams<{ jobId: string }>();

  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [selected, setSelected] = useState<ResumeData | null>(null);
  const [numPages, setNumPages] = useState(0);

  /* NEW: tab state */
  const [activeTab, setActiveTab] =
    useState<"summary" | "resume" | "notes">("summary");

  /* filter & search state */
  const [filter, setFilter] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");

  /* snackbar */
  const [snack, setSnack] = useState<{ o: boolean; m: string }>({
    o: false,
    m: "",
  });
  const openSnack = (m: string) => setSnack({ o: true, m });

  /* ─── Load once ─────────────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      toast.loading("Loading…", { id: "load" });

      const { data: uploads, error } = await supabase
        .from("resume_uploads")
        .select(
          "resume_id, file_name, file_path, resume_rankings (rank, total_score, status, candidate_name), resume_analysis (key_skills, certifications_courses, relevant_projects, soft_skills, overall_analysis)"
        )
        .eq("job_id", jobId);

      if (error) {
        toast.error(error.message, { id: "load" });
        return;
      }

      const mapped: ResumeData[] =
        uploads?.map((row: any) => {
          const r = row.resume_rankings?.[0] || {};
          const a = row.resume_analysis?.[0] || {};
          return {
            resume_id: row.resume_id,
            file_name: row.file_name,
            candidate_name: r.candidate_name || stripExt(row.file_name),
            file_path: row.file_path,
            status: (r.status as Status) || "unreviewed",
            total_score: r.total_score || 0,
            rank: r.rank || 0,
            analysis: {
              key_skills: a.key_skills || [],
              certifications_courses: a.certifications_courses || [],
              relevant_projects: a.relevant_projects || [],
              soft_skills: a.soft_skills || [],
              overall_analysis: a.overall_analysis || "",
              overall_match_score: a.overall_match_score || 0,
              projects_relevance_score: a.projects_relevance_score || 0,
              experience_relevance_score: a.experience_relevance_score || 0,
            },
          };
        }) || [];

      setResumes(mapped);
      setSelected(mapped[0] || null);
      setActiveTab("summary");
      toast.success("Loaded", { id: "load" });
    })();
  }, [jobId]);

  /* ─── Update status ─────────────────────────────────────────────────── */
  const setStatus = async (resumeId: string, s: Status) => {
    setResumes((prev) =>
      prev.map((r) => (r.resume_id === resumeId ? { ...r, status: s } : r))
    );
    if (selected?.resume_id === resumeId) setSelected({ ...selected, status: s });

    const { error } = await supabase
      .from("resume_rankings")
      .update({ status: s })
      .eq("resume_id", resumeId);

    if (error) {
      toast.error(error.message);
      return;
    }
    openSnack(`Marked as ${s}`);
  };

  /* ─── Derived list with filter/search ──────────────────────────────── */
  const visible = useMemo(() => {
    let list = resumes;
    if (filter !== "all") list = list.filter((r) => r.status === filter);
    if (search.trim())
      list = list.filter((r) =>
        r.candidate_name.toLowerCase().includes(search.toLowerCase())
      );
    return list;
  }, [resumes, filter, search]);

  /* ─── UI ────────────────────────────────────────────────────────────── */
  return (
    <Grid container height="100vh" sx={{ bgcolor: "#0e0e0e" }}>
      {/* Left panel */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          borderRight: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          bgcolor: "rgba(255,255,255,0.02)",
          p: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
          Candidates ({visible.length}/{resumes.length})
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 1.5,
            "& .MuiInputBase-root": {
              bgcolor: "#1f1f1f",
              color: "#fff",
              fontSize: 14,
              fontFamily: "Manrope",
            },
            "& .MuiInputBase-input::placeholder": { color: "#777" },
          }}
        />

        {/* Filter tabs */}
        <Tabs
          value={filter}
          onChange={(_, v) => setFilter(v)}
          variant="scrollable"
          scrollButtons={false}
          sx={{
            mb: 2,
            ".MuiTab-root": {
              fontSize: 12,
              textTransform: "capitalize",
              minWidth: 0,
              mr: 1,
              color: "#aaa",
            },
            ".Mui-selected": { color: "#fff" },
            ".MuiTabs-indicator": { bgcolor: "#6366f1" },
          }}
        >
          <Tab value="all" label="All" />
          {statusOptions.map((s) => (
            <Tab key={s} value={s} label={s} />
          ))}
        </Tabs>

        <Stack spacing={1.2}>
          {visible.map((c) => (
            <motion.div
              key={c.resume_id}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelected(c);
                setActiveTab("summary");
              }}
              style={{
                borderRadius: 12,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                background:
                  selected?.resume_id === c.resume_id
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
              }}
            >
              <Avatar sx={{ width: 36, height: 36, bgcolor: "#2d2d2d", mr: 1.5 }}>
                {c.candidate_name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </Avatar>
              <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                <Tooltip title={c.candidate_name}>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 14,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.candidate_name}
                  </Typography>
                </Tooltip>
                <Typography variant="caption" sx={{ color: "#888" }}>
                  Score {c.total_score.toFixed(1)}
                </Typography>
              </Box>
              <Chip
                label={c.status}
                icon={ICON[c.status]}
                size="small"
                sx={{
                  bgcolor: `${CLR[c.status]}22`,
                  color: CLR[c.status],
                  textTransform: "capitalize",
                }}
              />
            </motion.div>
          ))}
        </Stack>
      </Grid>

      {/* Right panel */}
      <Grid item xs={12} md={8} sx={{ p: 3, overflowY: "auto" }}>
        {selected ? (
          <>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Box>
                <Typography variant="h5" sx={{ color: "#fff", fontFamily: "Manrope" }}>
                  {selected.candidate_name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#aaa" }}>
                  Rank #{selected.rank} • Score {selected.total_score.toFixed(2)}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {(["shortlisted", "waitlisted", "rejected"] as const).map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    icon={ICON[s]}
                    onClick={() => setStatus(selected.resume_id, s)}
                    sx={{
                      cursor: "pointer",
                      bgcolor:
                        selected.status === s
                          ? `${CLR[s]}22`
                          : "rgba(255,255,255,0.04)",
                      color: CLR[s],
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

            {/* Tabs */}
            <Stack direction="row" spacing={2} mb={3}>
              {(["summary", "resume", "notes"] as const).map((t) => (
                <Button
                  key={t}
                  variant={activeTab === t ? "contained" : "text"}
                  onClick={() => setActiveTab(t)}
                  sx={{
                    textTransform: "capitalize",
                    fontFamily: "Manrope",
                    color: activeTab === t ? "#fff" : "#aaa",
                    bgcolor:
                      activeTab === t ? "rgba(255,255,255,0.08)" : "transparent",
                  }}
                >
                  {t}
                </Button>
              ))}
            </Stack>

            {/* Summary */}
            {activeTab === "summary" && (
              <Box>
                <Typography sx={{ color: "#fff", mb: 1 }}>Overall Analysis</Typography>
                <Typography sx={{ color: "#ccc", mb: 3 }}>
                  {selected.analysis.overall_analysis || "N/A"}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ color: "#aaa" }}>Relevant Projects</Typography>
                    <ul style={{ color: "#eee", paddingLeft: 16 }}>
                      {selected.analysis.relevant_projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ color: "#aaa" }}>Key Skills</Typography>
                    <Stack direction="row" flexWrap="wrap" spacing={1}>
                      {selected.analysis.key_skills.map((k, i) => (
                        <Chip
                          key={i}
                          label={k}
                          size="small"
                          sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.05)" }}
                        />
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Resume */}
            {activeTab === "resume" && (
              <Box>
                <Document
                  file={selected.file_path}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  loading={<CircularProgress color="inherit" />}
                >
                  {Array.from({ length: numPages || 1 }, (_, i) => (
                    <PdfPage
                      key={i}
                      pageNumber={i + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={600}
                    />
                  ))}
                </Document>
                <Button
                  startIcon={<DownloadIcon />}
                  href={selected.file_path}
                  target="_blank"
                  sx={{ mt: 2, color: "#fff" }}
                >
                  Download
                </Button>
              </Box>
            )}

            {/* Notes */}
            {activeTab === "notes" && (
              <Box>
                <Typography sx={{ color: "#fff", mb: 1 }}>
                  Notes &amp; Comments
                </Typography>
                <textarea
                  placeholder="Write notes…"
                  style={{
                    width: "100%",
                    minHeight: 120,
                    background: "rgba(255,255,255,0.03)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 4,
                    padding: 8,
                  }}
                />
                <Button sx={{ mt: 2, bgcolor: "#6366f1", color: "#fff" }}>Save</Button>
              </Box>
            )}
          </>
        ) : (
          <Typography sx={{ color: "#ccc" }}>Select a candidate.</Typography>
        )}
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snack.o}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, o: false })}
        message={snack.m}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
        action={
          <IconButton
            size="small"
            sx={{ color: "#fff" }}
            onClick={() => setSnack({ ...snack, o: false })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Grid>
  );
}
