"use client";

import { useState } from "react";
import { Bot, MapPinned, Send, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { roadwatchApi } from "@/services/api";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

interface Message {
  role: "user" | "assistant";
  text: string;
  citations?: string[];
}

export function ChatAssistant() {
  const [input, setInput] = useState("Who is responsible for the pothole near Velachery MRTS?");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Ask about nearby complaints, repair status, responsible authority, contractor, budget, or ward-level performance. I answer from RoadWatch records only."
    }
  ]);

  async function send() {
    if (!input.trim()) return;
    const nextInput = input;
    setMessages((current) => [...current, { role: "user", text: nextInput }]);
    setInput("");
    const response = await roadwatchApi.chat(nextInput);
    setMessages((current) => [...current, { role: "assistant", text: response.answer, citations: response.citations }]);
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-5 px-4 py-6 pb-28 md:grid-cols-[1fr_340px] md:px-8">
      <section className="glass-panel flex min-h-[72vh] flex-col rounded-lg border border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
        <div className="border-b border-road-outline/45 p-5">
          <SectionHeading eyebrow="Grounded Assistant" title="RoadWatch AI" description="Conversational civic intelligence synchronized to structured complaints, budgets, and authority records." status="RAG guarded" />
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-5 scrollbar-thin">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-auto max-w-[78%]" : "mr-auto max-w-[82%]"}>
              <div className={message.role === "user" ? "rounded-lg bg-road-yellow p-3 text-asphalt-deep font-semibold shadow-glow" : "rounded-lg border border-road-outline/30 bg-asphalt-deep/80 p-3 text-road-cream shadow-panel"}>
                <p className="text-sm leading-6">{message.text}</p>
                {message.citations && (
                  <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-road-muted mr-1">Citations:</span>
                    {message.citations.map((cite) => (
                      <span key={cite} className="inline-block rounded-full bg-asphalt-elevated/80 px-2.5 py-0.5 border border-road-outline/40 text-[10px] tracking-wider text-road-yellow font-mono">
                        {cite}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-road-outline/45 p-4 bg-asphalt-deep/40">
          <Input 
            value={input} 
            onChange={(event) => setInput(event.target.value)} 
            onKeyDown={(event) => event.key === "Enter" && send()} 
            className="bg-asphalt-deep border-road-outline/35 text-road-cream focus:border-road-yellow rounded-lg"
            placeholder="Query telemetry database..."
          />
          <Button onClick={send} size="icon" className="bg-road-yellow text-asphalt-deep hover:bg-road-yellow-dim shadow-glow" aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <aside className="space-y-4">
        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-road-cream"><Bot className="h-5 w-5 text-road-yellow animate-pulse" /> Retrieval policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-road-muted">
            <p>The assistant retrieves structured complaints, projects, budgets, and authority records before answering.</p>
            <p className="rounded border border-road-yellow/30 bg-road-yellow/10 p-3 text-road-cream"><ShieldAlert className="mr-2 inline h-4 w-4 text-road-yellow" /> It does not hallucinate missing civic data or control routing decisions.</p>
            <StatusPill tone="blue"><MapPinned className="h-3 w-3" /> Map context ready</StatusPill>
          </CardContent>
        </Card>
        {["How many complaints exist nearby?", "What is the repair status?", "Which contractor handled this road?", "How much budget was allocated?"].map((prompt) => (
          <button key={prompt} onClick={() => setInput(prompt)} className="w-full rounded border border-road-outline/30 bg-asphalt-panel/60 p-3 text-left text-sm font-semibold text-road-muted shadow-sm transition duration-300 hover:border-road-yellow/50 hover:text-road-cream hover:bg-asphalt-panel/80 hover:shadow-glow">
            {prompt}
          </button>
        ))}
      </aside>
    </main>
  );
}
