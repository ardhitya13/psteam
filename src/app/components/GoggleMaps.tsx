"use client";

export default function GoogleMap() {
  return (
    <div className="w-full h-[240px] mt-3 rounded-2xl overflow-hidden border border-white/25 shadow-[0_0_25px_rgba(96,165,250,0.2)] hover:shadow-[0_0_40px_rgba(96,165,250,0.3)] transition-all duration-500">
      <iframe
        title="Lokasi Tower A Polibatam (Satelit)"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.371633613185!2d104.0475928!3d1.118553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d989a71199d92d%3A0x23efd5fc785fd9dd!2sTower%20A%20Politeknik%20Negeri%20Batam!5e0!3m2!1sid!2sid!4v1730330400000!5m2!1sid!2sid&t=k"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-2xl w-full h-full"
      />
    </div>
  );
}
