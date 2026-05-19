import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Minus, Plus, Loader2 } from "lucide-react";
import { quizApi } from "../services/api";
import LoadingOverlay from "../components/shared/LoadingOverlay";


export default function QuizConfigPage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const quizId = searchParams.get("id");

    const [selectedTheme, setSelectedTheme] = useState("dark-academic");
    const [isTimerEnabled, setIsTimerEnabled] = useState(true);
    const [duration, setDuration] = useState(15);
    const [passingScore, setPassingScore] = useState(70);
    const [quizTitle, setQuizTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState(false);

    useEffect(() => {
        if (quizId) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            quizApi.getById(quizId).then((data: any) => {
                setQuizTitle(data.title || "");
                if (data.theme) setSelectedTheme(data.theme);
                if (data.settings) {
                    setPassingScore(data.settings.passingScore || 70);
                    setIsTimerEnabled(data.settings.timerEnabled ?? true);
                    setDuration(data.settings.durationMinutes || 15);
                }
                setLoading(false);
            }).catch(() => setLoading(false));
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false);
        }
    }, [quizId]);

    const handlePublish = async () => {
        if (!quizId) return;
        setPublishing(true);
        try {
            await quizApi.update(quizId, {
                title: quizTitle,
                theme: selectedTheme,
                settings: {
                    timerEnabled: isTimerEnabled,
                    durationMinutes: duration,
                    passingScore
                }
            });

            const pubQuiz = await quizApi.publish(quizId, { expiryOption: '7-days' });
            navigate(`/create/share?id=${quizId}&url=${encodeURIComponent(pubQuiz.share.shareUrl)}`);
        } catch (err) {
            console.error(err);
            setPublishing(false);
        }
    };



    // const themes = [
    //     { id: "light", name: "Light", color: "#E2E8F0" },
    //     { id: "dark-academic", name: "Dark Academic", color: "#0D1511" },
    //     { id: "amber-glow", name: "Amber Glow", color: "linear-gradient(to bottom right, #B28228, #452b02)" },
    // ];

    if (loading) return <div className="flex-1 flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-primary" size={32} /></div>;

    return (
        <div className="flex-1 w-full bg-background flex flex-col items-center pt-10 pb-36 overflow-y-auto px-4 z-0 font-sans">
            <LoadingOverlay active={publishing} type="save" message="Publishing your custom quiz..." />
            <div className="w-full max-w-3xl mb-12 text-center md:text-left transition-all duration-300">
                <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">Configure your <span className="italic px-1">Quiz</span></h1>
                <p className="text-muted-foreground text-[15px]">Set your quiz rules and preferences before publishing.</p>
            </div>

            <div className="w-full max-w-3xl flex flex-col gap-6">

                {/* Theme Settings */}


                {/* <div className="w-full bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 shadow-xl transition-all duration-300">
                    <h2 className="text-lg font-serif italic text-foreground mb-8 flex items-center gap-2">
                        <span className="w-6 h-px bg-primary"></span>
                        Visual Theme
                    </h2>
                    <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                        {themes.map((theme) => (
                            <div
                                key={theme.id}
                                onClick={() => setSelectedTheme(theme.id)}
                                className="flex flex-col items-center gap-4 w-full cursor-pointer group"
                            >
                                <div
                                    className={`w-full h-30 rounded-xl border-2 transition-all duration-300 relative overflow-hidden flex items-center justify-center
                                    ${selectedTheme === theme.id
                                            ? "border-primary shadow-[0_0_15px_rgba(198,155,53,0.15)] scale-[1.02]"
                                            : "border-border opacity-30 hover:opacity-60"}`}
                                    style={{ background: theme.color }}
                                >
                                    {selectedTheme === theme.id && (
                                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg z-10">
                                            <Check size={14} strokeWidth={4} className="text-background" />
                                        </div>
                                    )}

                                    {selectedTheme === theme.id && (
                                        <div className="w-3/4 h-20 border border-border bg-card opacity-80 rounded-md flex flex-col p-2 gap-1.5 pointer-events-none">
                                            <div className="w-1/3 h-1 bg-primary/40 rounded-full mx-auto" />
                                            <div className="w-full h-0.5 bg-border" />
                                            <div className="w-full h-1 bg-muted-foreground/20 rounded-full mt-2" />
                                            <div className="w-2/3 h-1 bg-muted-foreground/20 rounded-full" />
                                        </div>
                                    )}


                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300
                                ${selectedTheme === theme.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                                    {theme.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Timer Control */}



                <div className={`w-full bg-card/40 backdrop-blur-sm border rounded-xl p-8 shadow-xl transition-all duration-500
          ${isTimerEnabled ? "border-border" : "border-border/50 opacity-80"}`}>
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h2 className="text-lg font-serif italic text-foreground mb-1">Quiz Timer</h2>
                            <p className="text-muted-foreground text-[13px]">Enable or disable the global quiz timer</p>
                        </div>
                        <button
                            onClick={() => setIsTimerEnabled(!isTimerEnabled)}
                            className={`w-12 h-6 rounded-full relative transition-all duration-300 flex items-center px-1
                            ${isTimerEnabled ? "bg-primary" : "bg-border"}`}
                        >
                            <div className={`w-4 h-4 bg-foreground rounded-full shadow-md transition-all duration-300 transform
                            ${isTimerEnabled ? "translate-x-6" : "translate-x-0"}`}
                            />
                        </button>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTimerEnabled ? "max-h-75 opacity-100" : "max-h-0 opacity-0 invisible"}`}>
                        <div className="flex flex-col md:flex-row items-center gap-8 bg-background/60 p-6 rounded-xl border border-border">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg border transition-colors ${isTimerEnabled ? "bg-card border-primary/50 text-primary" : "bg-card border-border text-muted-foreground"}`}>
                                    <Clock size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Duration</span>
                                    <span className="text-foreground text-2xl font-serif">{duration} <span className="text-sm font-sans italic opacity-60">minutes</span></span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 flex-1 justify-end w-full md:w-auto">
                                <button
                                    onClick={() => setDuration(Math.max(1, duration - 1))}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-90"
                                    title="Decrease time"
                                >
                                    <Minus size={20} />
                                </button>

                                <div className="flex bg-background p-1 overflow-x-auto scrollbar-hide rounded-lg border border-border gap-1">
                                    {[5, 15, 30, 45, 60].map((preset) => (
                                        <button
                                            key={preset}
                                            onClick={() => setDuration(preset)}
                                            className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all
                                            ${duration === preset
                                                    ? "bg-primary text-background"
                                                    : "text-muted-foreground hover:bg-card hover:text-foreground"}`}
                                        >
                                            {preset}m
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setDuration(duration + 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-90"
                                    title="Increase time"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Passing Score */}
                <div className="w-full bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-serif italic text-foreground">Passing Score</h2>
                        <div className="text-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 bg-primary/5 rounded-md border border-primary/20">
                            {passingScore}% Required
                        </div>
                    </div>
                    <p className="text-muted-foreground text-[13px] mb-8">Set the minimum score a student needs to pass.</p>

                    <div className="relative pt-6 pb-2 cursor-pointer group">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={passingScore}
                            onChange={(e) => setPassingScore(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-primary"
                            style={{
                                background: `linear-gradient(to right, #C69B35 ${passingScore}%, #1f3329 ${passingScore}%)`
                            }}
                        />
                        <div className="flex justify-between w-full mt-4 text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-40">
                            <span>0% (0%)</span>
                            <span>50% (50%)</span>
                            <span>100% (100%)</span>
                        </div>
                    </div>
                </div>

                {/* Identification */}
                <div className="w-full bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 shadow-xl transition-all duration-300">
                    <h2 className="text-lg font-serif italic text-foreground mb-8 flex items-center gap-2">
                        <span className="w-6 h-px bg-primary"></span>
                        Quiz Details
                    </h2>

                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase pl-1">Quiz Title</label>
                        <input
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            className="w-full bg-background border border-border p-4 rounded-lg text-foreground text-sm outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/20"
                            placeholder="Your Quiz Title"
                        />
                    </div>
                </div>
            </div>

            {/* Controls */}
      <div className="fixed bottom-0 right-0 z-20 w-full bg-background/90 backdrop-blur-md border-t border-border flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-12 md:py-5">
        <Link to={quizId ? `/create/edit?id=${quizId}` : "/create/edit"} className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground transition-all text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-widest group shrink-0">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Back to </span>Editor
        </Link>
        <button
          onClick={handlePublish}
          disabled={publishing}
          className="flex items-center gap-2 bg-primary hover:bg-primary text-background font-bold uppercase rounded-sm transition-all shadow-lg active:scale-95 whitespace-nowrap
            text-[9px] tracking-[0.06em] px-3.5 py-2.5
            sm:text-[10px] sm:tracking-widest sm:px-6 sm:py-3
            md:text-[11px] md:tracking-[0.15em] md:px-8 md:py-3.5"
        >
          {publishing ? "Publishing..." : "Publish Quiz"}
          <ArrowRight size={13} className="sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
        </button>
      </div>

      </div>

    )
}