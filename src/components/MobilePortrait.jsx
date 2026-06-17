import profile from '../../data/profile.json'
import contact from '../../data/contact.json'

export default function MobilePortrait() {
  const hasPhoto = Boolean(profile.photo)

  return (
    <div className="relative xl:hidden -mt-16 mb-0 z-20 px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(27,42,74,0.12)] border border-cream p-5 flex items-center gap-5">
        {hasPhoto ? (
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-28 h-40 rounded-xl object-contain bg-cream/50"
            />
          ) : (
            <div className="w-28 h-40 rounded-xl border-2 border-dashed border-gold/40 bg-cream/50 shrink-0 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold/50">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        <div>
          <p className="text-navy font-display font-bold text-sm">{profile.name}</p>
          <p className="text-taupe text-xs">{profile.title}</p>
          <p className="text-gold text-xs font-semibold mt-1">{contact.area}</p>
        </div>
      </div>
    </div>
  )
}
