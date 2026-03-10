import FaqSection from '../../components/FaqSection'

export default function FaqPage() {
  return (
    <div className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-center [&_section]:py-6 [&_.mb-14]:!mb-6">
      <FaqSection />
    </div>
  )
}
