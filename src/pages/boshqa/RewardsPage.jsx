import RewardsSection from '../../components/RewardsSection'

export default function RewardsPage() {
  return (
    <div className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-center [&_section]:py-6 [&_.mb-16]:!mb-6 [&_.mt-12]:!mt-6">
      <RewardsSection />
    </div>
  )
}
