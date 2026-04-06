import SharedNav from "@/components/SharedNav"
import SharedFooter from "@/components/SharedFooter"
import MiltonHomepage from "@/components/MiltonHomepage"

export default function Home() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#061c27", 
      color: "#fff", 
      position: "relative", 
      overflow: "hidden" 
    }}>
      {/* Aurora bg */}
      <div style={{
        position: "fixed", 
        inset: 0, 
        zIndex: 0, 
        pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(13,154,165,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(154,241,152,0.04) 0%, transparent 50%), radial-gradient(ellipse 90% 60% at 50% 0%, rgba(8,69,94,0.3) 0%, transparent 70%)",
      }} />

      <SharedNav />
      <MiltonHomepage />
      <SharedFooter />
    </div>
  )
}
