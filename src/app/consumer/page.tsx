import { ConsumerLayout } from "@/components/consumer-layout"
import { QRScanner } from "@/components/qr-scanner"
import { ProductHero } from "@/components/product-hero"

export default function ConsumerPage() {
  return (
    <ConsumerLayout>
      <div className="space-y-8">
        <ProductHero />
        <QRScanner />
      </div>
    </ConsumerLayout>
  )
}
