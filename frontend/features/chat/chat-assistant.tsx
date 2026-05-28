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
      <section className="glass-panel flex min-h-[72vh] flex-col rounded-lg">
        <div className="border-b border-road-outline/45 p-5">
          <SectionHeading eyebrow="Grounded Assistant" title="RoadWatch AI" description="Conversational civic intelligence synchronized to structured complaints, budgets, and authority records." status="RAG guarded" />
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-auto max-w-[78%]" : "mr-auto max-w-[82%]"}>
              <div className={message.role === "user" ? "rounded bg-road-yellow p-3 text-asphalt-deep" : "rounded border border-road-outline bg-asphalt-deep/70 p-3 text-road-cream"}>
                <p className="text-sm leading-6">{message.text}</p>
                {message.citations && (
                  <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-road-yellow">Citations: {message.citations.join(", ")}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-road-outline/45 p-4">
          <Input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} />
          <Button onClick={send} size="icon" aria-label="Send message"><Send className="h-4 w-4" /></Button>
        </div>
      </section>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-road-yellow" /> Retrieval policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-road-muted">
            <p>The assistant retrieves structured complaints, projects, budgets, and authority records before answering.</p>
            <p className="rounded border border-road-yellow/30 bg-road-yellow/10 p-3 text-road-cream"><ShieldAlert className="mr-2 inline h-4 w-4 text-road-yellow" /> It does not hallucinate missing civic data or control routing decisions.</p>
            <StatusPill tone="blue"><MapPinned className="h-3 w-3" /> Map context ready</StatusPill>
          </CardContent>
        </Card>
        {["How many complaints exist nearby?", "What is the repair status?", "Which contractor handled this road?", "How much budget was allocated?"].map((prompt) => (
          <button key={prompt} onClick={() => setInput(prompt)} className="w-full rounded border border-road-outline bg-asphalt-panel/70 p-3 text-left text-sm font-medium text-road-muted shadow-sm transition hover:border-road-yellow/50 hover:text-road-cream">
            {prompt}
          </button>
        ))}
      </aside>
    </main>
  );
}
