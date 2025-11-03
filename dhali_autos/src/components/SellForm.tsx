'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const initialFormValues = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  carMake: '',
  carModel: '',
  carYear: '',
  mileage: '',
  condition: '',
  askingPrice: '',
  additionalDetails: ''
};

const MAX_TOTAL_UPLOAD_BYTES = 35 * 1024 * 1024; // 35 MB safety margin under Resend/Vercel limits

export default function SellForm() {
  const [values, setValues] = useState(initialFormValues);
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = (field: keyof typeof initialFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) {
      return;
    }

    setStatus('idle');
    setErrorMessage('');

    const incomingFiles = Array.from(fileList);

    setImages(prevImages => {
      const merged = [...prevImages, ...incomingFiles];
      const unique: File[] = [];
      const seen = new Set<string>();
      let totalBytes = 0;

      for (const file of merged) {
        const identifier = `${file.name}-${file.size}-${file.lastModified}`;
        if (seen.has(identifier)) continue;
        seen.add(identifier);
        unique.push(file);
        totalBytes += file.size;
        if (unique.length === 10) break;
      }

      if (totalBytes > MAX_TOTAL_UPLOAD_BYTES) {
        setStatus('error');
        setErrorMessage('Total image size must stay under 35 MB. Please remove or compress some files.');
        return prevImages;
      }

      return unique;
    });
  };

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setStatus('idle');
    setErrorMessage('');
  };

  const resetForm = () => {
    setValues(initialFormValues);
    setImages([]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      images.forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch('/api/sell-inquiry', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || 'Unable to submit your request right now.');
      }

      resetForm();
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  const isSubmitting = status === 'loading';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm text-slate-200">
          Full name
          <input
            required
            value={values.fullName}
            onChange={updateField('fullName')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="John Smith"
            name="fullName"
            type="text"
            autoComplete="name"
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-200">
          Email
          <input
            required
            value={values.email}
            onChange={updateField('email')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="you@example.com"
            name="email"
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-200">
          Phone number
          <input
            required
            value={values.phone}
            onChange={updateField('phone')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="+1 555 123 4567"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-200">
          City
          <input
            value={values.city}
            onChange={updateField('city')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="Dubai"
            name="city"
            type="text"
            autoComplete="address-level2"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm text-slate-200">
          Make
          <input
            required
            value={values.carMake}
            onChange={updateField('carMake')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="Mercedes-AMG"
            name="carMake"
            type="text"
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-200">
          Model
          <input
            required
            value={values.carModel}
            onChange={updateField('carModel')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="G63"
            name="carModel"
            type="text"
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-200">
          Model year
          <input
            required
            value={values.carYear}
            onChange={updateField('carYear')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="2021"
            name="carYear"
            type="text"
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-200">
          Mileage (km or miles)
          <input
            required
            value={values.mileage}
            onChange={updateField('mileage')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="12,500 km"
            name="mileage"
            type="text"
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-200">
          Vehicle condition
          <input
            value={values.condition}
            onChange={updateField('condition')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="Excellent / showroom / restored"
            name="condition"
            type="text"
            disabled={isSubmitting}
          />
        </label>
        <label className="flex flex-col text-sm text-slate-200">
          Asking price (optional)
          <input
            value={values.askingPrice}
            onChange={updateField('askingPrice')}
            className="mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            placeholder="BDT 250,000"
            name="askingPrice"
            type="text"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <label className="flex flex-col text-sm text-slate-200">
        Additional details
        <textarea
          value={values.additionalDetails}
          onChange={updateField('additionalDetails')}
          className="mt-2 min-h-[120px] rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
          placeholder="List special options, provenance, or recent maintenance."
          name="additionalDetails"
          disabled={isSubmitting}
        />
      </label>

      <div className="rounded-2xl border border-dashed border-sky-400/40 bg-slate-900/40 p-6 text-sm text-slate-200">
        <label className="flex flex-col gap-3">
          Upload images (up to 10)
          <input
            required
            onChange={handleFilesChange}
            className="text-xs text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-sky-500/80 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-sky-500"
            type="file"
            name="images"
            accept="image/png,image/jpeg,image/webp"
            multiple
            disabled={isSubmitting}
          />
        </label>
        {images.length > 0 && (
          <ul className="mt-4 space-y-2 text-xs text-slate-300">
            {images.map((file, index) => {
              const identifier = `${file.name}-${file.size}-${file.lastModified}`;
              return (
                <li key={identifier} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-slate-200">{file.name}</p>
                    <p className="text-[11px] text-slate-400">{Math.round(file.size / 1024)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="rounded-full border border-white/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200 transition hover:border-white hover:bg-white/10 hover:text-white"
                    aria-label={`Remove ${file.name}`}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {status === 'success' && (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-900/20 px-4 py-3 text-sm text-emerald-200">
          Thank you. Our concierge team will contact you shortly.
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-900/20 px-4 py-3 text-sm text-rose-200">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-sky-500/60"
      >
        {isSubmitting ? 'Submitting…' : 'Submit vehicle details'}
      </button>
    </form>
  );
}
