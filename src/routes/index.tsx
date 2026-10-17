import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import portraitAsset from "@/assets/portrait.asset.json";
import logoAsset from "@/assets/logo.png.asset.json";
import bgLogoAsset from "@/assets/qld-gov-bg.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mock QLD Driver Licence" },
      { name: "description", content: "Interactive mock Queensland driver licence — edit the details." },
    ],
  }),
  component: MockLicence,
});

type Info = {
  firstName: string;
  lastName: string;
  dob: string;
  licenceNo: string;
  refreshed: string;
  status: string;
  ageOver18: boolean;
  class: string;
  type: string;
  expiry: string;
  conditions: string;
  addressLines: string[];
  photoUrl: string;
  signatureUrl: string;
};


const DEFAULTS: Info = {
  firstName: "SAM",
  lastName: "SAMPLE",
  dob: "01 Jan 1980",
  licenceNo: "123456789",
  refreshed: "15 May 2025 10:58am",
  status: "Current",
  ageOver18: true,
  class: "(C) Car",
  type: "(L) Learner",
  expiry: "03 Mar 2026",
  conditions: "-",
  addressLines: ["10 PRETEND STREET", "BRISBANE", "QLD 4000", "AUSTRALIA"],
  photoUrl: portraitAsset.url,
  signatureUrl: "",
};

function MockLicence() {
  const [info, setInfo] = useState<Info>(DEFAULTS);
  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center py-6 relative">
      {/* Fixed, centered, slowly pulsing background logo — overlays above the card */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none flex items-center justify-center z-20"
      >
        <img
          src={bgLogoAsset.url}
          alt=""
          className="w-[70vmin] max-w-[600px] animate-bg-pulse select-none mix-blend-multiply"
        />
      </div>
      <div className="relative z-10 w-full max-w-[420px] bg-white shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-licence-gold px-5 pt-4 pb-6">
          <div className="flex items-start justify-between">
            <button
              onClick={() => setEditing((e) => !e)}
              className="flex items-center gap-1 text-black font-medium hover:opacity-70 transition"
              aria-label="Back to edit"
            >
              <span className="text-xl leading-none">‹</span>
              <span>Back</span>
            </button>
            <img
              src={logoAsset.url}
              alt="Organisation logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-black">Driver Licence</h1>
        </div>

        {editing ? (
          <EditForm info={info} setInfo={setInfo} onDone={() => setEditing(false)} />
        ) : (
          <LicenceView info={info} />
        )}

        {/* Bottom nav */}
        <div className="mt-auto grid grid-cols-4 border-t border-neutral-200 bg-white">
          {[
            { label: "Home", icon: "⌂", active: true },
            { label: "Scan QR", icon: "⛶" },
            { label: "Show QR", icon: "▦" },
            { label: "Settings", icon: "⚙" },
          ].map((t) => (
            <div
              key={t.label}
              className={`flex flex-col items-center py-3 text-xs ${
                t.active ? "text-licence-red font-semibold" : "text-neutral-500"
              }`}
            >
              <span className="text-lg leading-none">{t.icon}</span>
              <span className="mt-1">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LicenceView({ info }: { info: Info }) {
  return (
    <div className="px-5 pt-5 pb-4 relative">


      <div className="relative flex gap-4">
        <img
          src={info.photoUrl}
          alt="Licence portrait"
          className="w-[130px] h-[165px] object-cover border border-neutral-200"
        />
        <div className="flex-1 pt-1">
          <div className="text-lg">{info.firstName}</div>
          <div className="text-2xl font-bold leading-tight">{info.lastName}</div>
          <div className="mt-3 text-xs text-neutral-600">DoB</div>
          <div className="font-bold">{info.dob}</div>
          <div className="mt-3 text-xs text-neutral-600 underline">Licence No. ⧉</div>
          <div className="font-bold">{info.licenceNo}</div>
        </div>
      </div>

      <div className="relative mt-4 text-sm">
        <div className="text-neutral-600">Information was refreshed online:</div>
        <div className="font-semibold">{info.refreshed}</div>
      </div>

      <Divider />
      <Row label={<span className="underline">Status ⓘ</span>}>
        <span className="inline-flex items-center rounded-full bg-licence-green text-white px-3 py-1 text-sm font-medium">
          {info.status}
        </span>
      </Row>

      <Divider />
      <Row label="Age">
        {info.ageOver18 ? (
          <span className="inline-flex items-center gap-1 text-licence-green font-medium">
            <span className="w-5 h-5 rounded-full bg-licence-green text-white flex items-center justify-center text-xs">✓</span>
            Over 18
          </span>
        ) : (
          <span className="text-neutral-700">Under 18</span>
        )}
      </Row>

      <Divider />
      <Row label={<span className="underline">Class ⓘ</span>}>
        <span className="font-medium">{info.class}</span>
      </Row>
      <Row label="Type" tight>
        <span className="font-medium">{info.type}</span>
      </Row>
      <Row label="Expiry" tight>
        <span className="font-medium">{info.expiry}</span>
      </Row>

      <Divider />
      <Row label="Conditions">
        <span>{info.conditions}</span>
      </Row>

      <Divider />
      <div className="relative flex gap-6 py-2">
        <div className="w-24 shrink-0">
          <div className="text-neutral-700">Address</div>
          <div className="italic text-xs text-neutral-500 mt-2">Are you details up to date?</div>
        </div>
        <div className="font-medium">
        {info.addressLines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>

      <Divider />
      <div className="relative flex gap-6 py-2">
        <div className="w-24 shrink-0 text-neutral-700">Signature</div>
        <div className="flex-1">
          {info.signatureUrl ? (
            <img
              src={info.signatureUrl}
              alt="Licence signature"
              className="h-16 w-full object-contain"
            />
          ) : (
            <div className="h-16 w-full border-b border-neutral-300" />
          )}
        </div>
      </div>

      <button className="relative mt-5 w-full bg-licence-gold text-black font-bold tracking-wide py-3 rounded-md hover:brightness-95 transition">
        SHARE PDF COPY
      </button>
    </div>
  );
}

function Divider() {
  return <div className="relative border-t border-neutral-200 my-3" />;
}

function Row({
  label,
  children,
  tight,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  tight?: boolean;
}) {
  return (
    <div className={`relative flex items-center gap-6 ${tight ? "py-1" : "py-2"}`}>
      <div className="w-24 shrink-0 text-neutral-700">{label}</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function EditForm({
  info,
  setInfo,
  onDone,
}: {
  info: Info;
  setInfo: (i: Info) => void;
  onDone: () => void;
}) {
  const [draft, setDraft] = useState<Info>(info);
  const update = <K extends keyof Info>(k: K, v: Info[K]) => setDraft({ ...draft, [k]: v });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setInfo(draft);
        onDone();
      }}
      className="px-5 py-5 space-y-3"
    >
      <h2 className="text-lg font-bold">Edit licence details</h2>
      <div className="flex items-center gap-4">
        <img
          src={draft.photoUrl}
          alt="Portrait preview"
          className="w-20 h-24 object-cover border border-neutral-200 rounded"
        />
        <div className="flex-1">
          <label className="block text-xs font-medium text-neutral-600 mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) update("photoUrl", URL.createObjectURL(file));
            }}
            className="block w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-licence-gold file:text-black file:font-semibold hover:file:brightness-95"
          />
          {draft.photoUrl !== DEFAULTS.photoUrl && (
            <button
              type="button"
              onClick={() => update("photoUrl", DEFAULTS.photoUrl)}
              className="mt-1 text-xs text-neutral-500 underline"
            >
              Reset to default
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="First name" value={draft.firstName} onChange={(v) => update("firstName", v)} />
        <Field label="Last name" value={draft.lastName} onChange={(v) => update("lastName", v)} />
      </div>
      <Field label="Date of birth" value={draft.dob} onChange={(v) => update("dob", v)} />
      <Field label="Licence number" value={draft.licenceNo} onChange={(v) => update("licenceNo", v)} />
      <Field label="Refreshed at" value={draft.refreshed} onChange={(v) => update("refreshed", v)} />
      <Field label="Status" value={draft.status} onChange={(v) => update("status", v)} />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={draft.ageOver18}
          onChange={(e) => update("ageOver18", e.target.checked)}
        />
        Over 18
      </label>
      <div className="grid grid-cols-3 gap-3">
        <Field label="Class" value={draft.class} onChange={(v) => update("class", v)} />
        <Field label="Type" value={draft.type} onChange={(v) => update("type", v)} />
        <Field label="Expiry" value={draft.expiry} onChange={(v) => update("expiry", v)} />
      </div>
      <Field label="Conditions" value={draft.conditions} onChange={(v) => update("conditions", v)} />
      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">Address (one line each)</label>
        <textarea
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-licence-gold"
          rows={4}
          value={draft.addressLines.join("\n")}
          onChange={(e) => update("addressLines", e.target.value.split("\n"))}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">Signature</label>
        <SignaturePad
          value={draft.signatureUrl}
          onChange={(v) => update("signatureUrl", v)}
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-licence-gold text-black font-bold py-2.5 rounded-md hover:brightness-95"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onDone}
          className="flex-1 border border-neutral-300 py-2.5 rounded-md font-medium hover:bg-neutral-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-neutral-600 mb-1">{label}</span>
      <input
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-licence-gold"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function SignaturePad({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = value;
    }
  }, [value]);

  const getPoint = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const start = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    setDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const point = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!drawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const point = getPoint(e);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const stop = () => {
    if (!drawing) return;
    setDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL("image/png"));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange("");
  };

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        className="w-full h-28 rounded-md border border-neutral-300 bg-white touch-none cursor-crosshair"
        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={stop}
        onMouseLeave={stop}
        onTouchStart={start}
        onTouchMove={draw}
        onTouchEnd={stop}
      />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={clear}
          className="text-xs text-neutral-500 underline"
        >
          Clear signature
        </button>
        {value && value !== "" && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-neutral-500 underline"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
