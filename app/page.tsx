import { Button } from "@/components/ui/button";
import { getFromGoogleSheet } from "@/lib/apps-script";
import Link from "next/link";
import { PlusCircle, RefreshCw } from "lucide-react";
import { DashboardTable } from "@/components/dashboard-table";

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

export default async function Home() {
  let assessments = [];
  let error: string | null = null;
  
  try {
    const data = await getFromGoogleSheet();
    assessments = Array.isArray(data)
      ? data.filter((a: any) => a && typeof a === 'object' && !Array.isArray(a) && (a.PatientName || a['Patient Name']))
      : [];
  } catch (err) {
    console.error("Failed to fetch assessments:", err);
    error = "Could not connect to Google Sheets. Please ensure your GOOGLE_APPS_SCRIPT_URL is correct in Vercel settings.";
    assessments = [];
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Patient Assessments</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Showing {assessments.length} assessment{assessments.length !== 1 ? 's' : ''} • Data synced with Google Sheets
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <form>
            <Button type="submit" variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </form>
          <Button asChild size="sm" className="flex-1 sm:flex-none">
            <Link href="/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="hidden xs:inline">New Assessment</span>
              <span className="xs:hidden">New</span>
            </Link>
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-4 rounded-lg flex flex-col gap-2 mb-6 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            <p className="text-sm font-bold">Connection Sync Error</p>
          </div>
          <p className="text-xs opacity-90 pl-5">
            Details: {error}
          </p>
          <div className="mt-2 text-[10px] bg-white/50 p-2 rounded border border-destructive/10 font-mono">
            Debug: APPS_SCRIPT_URL is {process.env.GOOGLE_APPS_SCRIPT_URL ? "CONFIGURED (Correct)" : "MISSING (Check Vercel Settings)"}
          </div>
        </div>
      )}

      <DashboardTable assessments={assessments} />
    </div>
  );
}
