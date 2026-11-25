// Hands values to <QuoteForm /> (see the `msa:prefill` listener in Forms.jsx).
export default function prefillQuote(values) {
  window.dispatchEvent(new CustomEvent('msa:prefill', { detail: values }))
}
