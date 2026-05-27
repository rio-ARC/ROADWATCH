"use client";

import { useState } from "react";
import { Bot, Send, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { roadwatchApi } from "@/services/api";

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
    <main className="mx-auto grid max-w-6xl gap-5 px-4 py-6 pb-24 md:grid-cols-[1fr_320px] md:px-8">
      <section className="flex min-h-[72vh] flex-col rounded-lg border border-slate-200 bg-white shadow-civic">
        <div className="border-b border-slate-200 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Grounded Assistant</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">RoadWatch AI</h1>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-auto max-w-[78%]" : "mr-auto max-w-[82%]"}>
              <div className={message.role === "user" ? "rounded-lg bg-teal-700 p-3 text-white" : "rounded-lg bg-slate-100 p-3 text-slate-800"}>
                <p className="text-sm leading-6">{message.text}</p>
                {message.citations && (
                  <p className="mt-2 text-xs font-semibold text-teal-800">Citations: {message.citations.join(", ")}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-slate-200 p-4">
          <Input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} />
          <Button onClick={send} size="icon" aria-label="Send message"><Send className="h-4 w-4" /></Button>
        </div>
      </section>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-teal-700" /> Retrieval policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
            <p>The assistant retrieves structured complaints, projects, budgets, and authority records before answering.</p>
            <p className="rounded-md bg-amber-50 p-3 text-amber-900"><ShieldAlert className="mr-2 inline h-4 w-4" /> It does not hallucinate missing civic data or control routing decisions.</p>
          </CardContent>
        </Card>
        {["How many complaints exist nearby?", "What is the repair status?", "Which contractor handled this road?", "How much budget was allocated?"].map((prompt) => (
          <button key={prompt} onClick={() => setInput(prompt)} className="w-full rounded-md border border-slate-200 bg-white p-3 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:border-teal-300">
            {prompt}
          </button>
        ))}
      </aside>
    </main>
  );
}
