import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

interface TimerProps {
    IsAwaysPaused: boolean;
    isPaused: boolean;
    count: number;
    setIsAwaysPaused: (value: boolean) => void;
}

export function Timer({
    isPaused,
    count,
    setIsAwaysPaused,
    IsAwaysPaused,
}: TimerProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [label, setLabel] = useState("");

    const Icon = isPaused ? Pause : Play;

    useEffect(() => {
        function defineLabel() {
            if (isHovered && IsAwaysPaused) {
                setLabel("Despausar Continuamente");
            } else if (isHovered && !IsAwaysPaused) {
                setLabel("Pausar Continuamente");
            } else if (!isHovered && (IsAwaysPaused || isPaused)) {
                setLabel("Pausado");
            } else if (!isHovered && !IsAwaysPaused) {
                setLabel(`Próximo em ${count}s`);
            }
        }

        defineLabel();
    }, [isHovered, IsAwaysPaused, isPaused, count]);

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsAwaysPaused(!IsAwaysPaused)}
            className="absolute top-4 right-4 flex items-center gap-1 px-4 py-2.5 bg-black/70 rounded-lg backdrop-blur-sm border border-white/20 min-w-30 justify-center transition-all"
        >
            <Icon className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-200">{label}</span>
        </button>
    );
}
