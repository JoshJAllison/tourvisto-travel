import { calculateTrendPercentage } from "~/lib/utils"


const StatsCard = ({
    headerTitle,
    total,
    lastMonthCount,
    currentMonthCount
}: StatsCard) => {
    const {trend, percentage} = calculateTrendPercentage(currentMonthCount, lastMonthCount);
  return (
    <div>StatsCard</div>
  )
}

export default StatsCard