"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Question = {
  id: number;
  chapter: string;
  question: string;
  options: string[];
  correctAnswer: number | null;
  correctAnswers: number[];
  image?: string | null;
  explanation: string;
  type: "single" | "multiple";
};

export default function SetQuestionsPage() {
  const { id } = useParams();
  const setId = Number(id);
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [chapter, setChapter] = useState("");
  const [qtext, setQtext] = useState("");
  const [options, setOptions] = useState(["",""]);
  const [type, setType] = useState<"single"|"multiple">("single");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [image, setImage] = useState("");
  const [explanation, setExplanation] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadQuestions() {
    const res = await fetch(`/api/questions?setId=${setId}`);
    setQuestions(await res.json());
  }

  useEffect(() => { loadQuestions(); }, []);

  // --- Option management ---
  function setOptionValue(idx:number,val:string){
    const newOpts=[...options]; newOpts[idx]=val; setOptions(newOpts);
  }
  function addOption(){ setOptions([...options,""]); }
  function removeOption(idx:number){
    if(options.length<=2) return;
    const newOpts=options.filter((_,i)=>i!==idx); setOptions(newOpts);
    if(type==="single" && correctAnswer>=newOpts.length) setCorrectAnswer(0);
    if(type==="multiple") setCorrectAnswers(correctAnswers.filter(i=>i!==idx).map(i=>i>idx?i-1:i));
  }
  function toggleMultiAnswer(idx:number){
    if(correctAnswers.includes(idx)) setCorrectAnswers(correctAnswers.filter(i=>i!==idx));
    else setCorrectAnswers([...correctAnswers,idx]);
  }

  // --- Upload image to Cloudinary ---
  async function uploadImage(file: File){
    const formData=new FormData();
    formData.append("file", file);
    const res=await fetch("/api/upload", {method:"POST",body:formData});
    const data=await res.json();
    setImage(data.secure_url);
  }

  // --- Save question ---
  async function saveQuestion(){
    if(!chapter||!qtext||!options.length||!explanation) return;
    setSaving(true);
    const payload={
      setId,
      chapter,
      question:qtext,
      options,
      correctAnswer:type==="single"?correctAnswer:null,
      correctAnswers:type==="multiple"?correctAnswers:[],
      image:image||undefined,
      explanation,
      type
    };
    const res=await fetch("/api/questions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    if(!res.ok){ setError((await res.json()).error); setSaving(false); return; }
    setChapter(""); setQtext(""); setOptions(["",""]); setCorrectAnswer(0); setCorrectAnswers([]); setImage(""); setExplanation("");
    setSaving(false); loadQuestions();
  }

  // --- Delete question ---
  async function deleteQuestion(qid:number){
    if(!confirm("Delete question?")) return;
    await fetch(`/api/questions/${qid}`,{method:"DELETE"});
    loadQuestions();
  }

  return (
    <div>
      <button className="text-sm underline mb-4" onClick={()=>router.push("/admin")}>← Back to Sets</button>
      <h2 className="text-lg font-bold mb-2">Add Question</h2>

      <div className="bg-white p-4 border rounded mb-6 space-y-2">
        <div className="flex gap-2">
          <input className="border p-2 w-1/2" placeholder="Chapter" value={chapter} onChange={e=>setChapter(e.target.value)} />
          <select className="border p-2" value={type} onChange={e=>setType(e.target.value as any)}>
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </select>
        </div>
        <textarea className="border p-2 w-full" placeholder="Question" value={qtext} onChange={e=>setQtext(e.target.value)} rows={2} />
        
        <div className="space-y-1">
          {options.map((opt,i)=>(
            <div key={i} className="flex gap-2 items-center">
              {type==="single"?(
                <input type="radio" checked={correctAnswer===i} onChange={()=>setCorrectAnswer(i)} />
              ):(
                <input type="checkbox" checked={correctAnswers.includes(i)} onChange={()=>toggleMultiAnswer(i)} />
              )}
              <input className="border p-1 flex-1" value={opt} onChange={e=>setOptionValue(i,e.target.value)} />
              <button className="text-sm border px-2 rounded" onClick={()=>removeOption(i)}>Remove</button>
            </div>
          ))}
          <button className="text-sm border px-2 rounded" onClick={addOption}>+ Add Option</button>
        </div>

        <div>
          <input type="file" onChange={e=>{const f=e.target.files?.[0];if(f)uploadImage(f)}} />
          {image && <img src={image} className="w-32 mt-2 border rounded" />}
        </div>

        <textarea className="border p-2 w-full" placeholder="Explanation" value={explanation} onChange={e=>setExplanation(e.target.value)} rows={2} />

        <button onClick={saveQuestion} disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">
          {saving?"Saving...":"Add Question"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <h2 className="text-lg font-bold mb-2">Existing Questions</h2>
      <div className="space-y-3">
        {questions.map((q,idx)=>(
          <div key={q.id} className="border p-3 rounded bg-white">
            <div className="flex justify-between">
              <span>#{idx+1} {q.question}</span>
              <div className="flex gap-1">
                <a href={`/admin/sets/${setId}/edit/${q.id}`} className="text-blue-600 underline text-sm">Edit</a>
                <button onClick={()=>deleteQuestion(q.id)} className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
            {q.image && <img src={q.image} className="w-40 mt-1" />}
            <ul className="list-disc list-inside mt-1">
              {q.options.map((o,i)=>{
                const correct= q.type==="single"? q.correctAnswer===i : q.correctAnswers.includes(i);
                return <li key={i} className={correct?"font-semibold":""}>{o} {correct?"✅":""}</li>
              })}
            </ul>
            <div className="text-sm mt-1"><strong>Type:</strong> {q.type}</div>
            <div className="text-sm mt-1"><strong>Explanation:</strong> {q.explanation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
