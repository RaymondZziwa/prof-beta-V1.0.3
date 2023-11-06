import OverallTotalNumberOfChicken from "./status_bar_components/overall_total_number_of_chicken"
import OverallTotalNumberOfDeaths from "./status_bar_components/overall_total_number_of_deaths"
import OverallTotalNumberOfBatches from "./status_bar_components/total_number_of_batches"
import MortalityRate from "./status_bar_components/mortality_rate"
import OverallTotalNumberOfEggs from "./status_bar_components/overall_total_number_of_eggs"
import TotalGoodEggsCollected from "./status_bar_components/total_good_eggs_collected"
import TotalBadEggs from "./status_bar_components/total_bad_eggs_collected"
import EggLossRate from "./status_bar_components/egg_loss_rate"
import CurrentBatchTotalNumberOfChicken from "./current_batch_status_bar_components/current_batch_number_of_chicken"
import CurrentBatchNumberOfDeadChicken from "./current_batch_status_bar_components/current_batch_number_of_dead_chicken"
import CurrentAliveChicken from "./current_batch_status_bar_components/current_alive_chicken"
//import CurrentBatchMortalityRate from './chicken_farm_status_bar/current_batch_status_bar_components/current_batch_mortality_rate'
import CurrentBatchMortalityRate from "./current_batch_status_bar_components/current_batch_mortality_rate"

const ChickenMgtReportStatusBar = ({ batchData, eggRecords, feedingRecords }) => {
    return(
       <>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <OverallTotalNumberOfChicken batchData={batchData} />
            <OverallTotalNumberOfDeaths batchData={batchData} />
            <OverallTotalNumberOfBatches batchData={batchData} />
            <MortalityRate batchData={batchData} />
        </div>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
            <OverallTotalNumberOfEggs eggRecords={eggRecords} />
            <TotalGoodEggsCollected eggRecords={eggRecords} />
            <TotalBadEggs eggRecords={eggRecords} />
            <EggLossRate eggRecords={eggRecords} />
        </div>

        <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
            <CurrentBatchTotalNumberOfChicken batchData={batchData} />
            <CurrentAliveChicken batchData={batchData} />
            <CurrentBatchNumberOfDeadChicken batchData={batchData} />
            <CurrentBatchMortalityRate batchData={batchData} />
        </div>
       </>
    )
}

export default ChickenMgtReportStatusBar