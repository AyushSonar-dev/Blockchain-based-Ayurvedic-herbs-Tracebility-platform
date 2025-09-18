import { ConsumerLayout } from "@/components/consumer-layout"
import { ProductStory } from "@/components/product-story"
import { FarmMap } from "@/components/farm-map"
import { ProductTimeline } from "@/components/product-timeline"
import { QualityBadges } from "@/components/quality-badges"


interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <ConsumerLayout>
      <div className="space-y-8 bg-black">
        <ProductStory productId={params.id} />
        <QualityBadges />
        <FarmMap />
        <ProductTimeline />
       
      </div>
    </ConsumerLayout>
  )
}
