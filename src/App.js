import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import Login from './components/authentication/login';
import Namungoonadashboard from './components/Namungoona/supervisor dashboard/namungoonadasboard';
import Saveinventoryrecords from './components/Namungoona/inventory records/saveinventoryrecords';
import Stocktaking from './components/Namungoona/stock taking/sotcktaking';
import Manageinventory from './components/Namungoona/inventory crud/manageinventory';
import Viewinventoryrecords from './components/Namungoona/inventory records/viewinventoryrecords';
import Registerpersonnel from './components/Admin/personnel registration/registerpersonnel';
import Admindashboard from './components/Admin/admin dashboard/adminDashboard';
import Managerdashboard from './components/Masanafu/Manager/managerdashboard';

import { useContext, useRef, useEffect } from 'react';
import AuthContext from './store/auth-context';
import InventoryMenu from './components/Masanafu/Manager/inventorymenu';
import CustodianDashboard from './components/Masanafu/Custodian/custodiandashboard';
import Exhibitionmanagement from './components/Masanafu/Custodian/exhibition/exhibition';
import AccountSettings from './components/settings/settings';
import ProductOrders from './components/Masanafu/Manager/productorders';
import RequestRawMaterialsForm from './components/Masanafu/Manager/requestrawmaterials';
import PlaceOrderForm from './components/Namungoona/place order/placeorder';
import OrderRecords from './components/Masanafu/Manager/orderRecords';
import ExhibitionRecords from './components/Masanafu/Custodian/exhibitionrecords';
import ApprovedOrders from './components/Masanafu/Manager/approvedorders';
import RawMaterialRequests from './components/Masanafu/Custodian/rawmaterialrequests';
import RawMaterialRequestsRecords from './components/Masanafu/Custodian/rawmaterialrequestsrecords';
import ProductionRecords from './components/Masanafu/Manager/productionrecords';
import BranchOrderRecords from './components/Masanafu/Manager/branchorderrecords';
import FarmDashboard from './components/Masanafu/farm/farmdashboard';
import RequestSeeds from './components/Masanafu/farm/seed_requisition/request_seeds';
import ManageBatch from './components/Masanafu/farm/batch_manager/batch_manager'
import ViewBatchRecords from './components/Masanafu/farm/batch_manager/view_batch_records';
import RequisitionStatus from './components/Masanafu/farm/seed_requisition/requistion_status';
import FarmRequests from './components/Masanafu/Custodian/farm_requests';
import ProjectsManagerDashboard from './components/Masanafu/projects/projectsdashboard';
import MaterialCalculator from './components/Masanafu/projects/material_calculator/material_calculator';


import MakeProjectsOrder from './components/Masanafu/Custodian/make_projects_order';
import AddmachineryData from './components/Masanafu/projects/machinery/add_machinery_data';
import MachineryMenu from './components/Masanafu/projects/other_menus/machinery_menu';
import RegisterMaterial from './components/Masanafu/projects/register_materials/register_equipment';
import SaveNewProject from './components/Masanafu/projects/machinery/saveNewProject';
import ShopDashboard from './components/Masanafu/shop/shopDashboard';
import POS from './components/Masanafu/shop/point_of_sale/pos'
import RegisterShopInventory from './components/Masanafu/shop/register_shop_inventory/register_shop_inventory';
import StartBatchFromMotherGarden from './components/Masanafu/farm/batch_manager/start_batch_from_mother_garden';
import ProjectsRecords from './components/Masanafu/projects/records/projects_records';
import RequestEquipment from './components/Masanafu/projects/request_materials/request_equipment';
import ProjectsEquipmentRequests from './components/Masanafu/Custodian/project_equipment_requests';
import ProjectsRequestsRecords from './components/Masanafu/Custodian/projects_requests_records';
import FarmRequestsRecords from './components/Masanafu/Custodian/farm_requests_records';
import OrderDelivery from './components/Masanafu/projects/order_delivery/order_delivery';
import ReportsMenu from './components/Masanafu/shop/other_menus/reports_menu';
import InventoryManagementMenu from './components/Masanafu/shop/other_menus/inventory_mgt_menu';
import RecordShopExpenditure from './components/Masanafu/shop/expenditure/record_shop_expenditures';
import ManageExternalReceipts from './components/Masanafu/shop/external_receipts/manage_external_receipts';
import ShopStockTaking from './components/Masanafu/shop/shop_stock_taking/stock_taking';
import ShopInventoryRecords from './components/Masanafu/shop/shop_inventory_records/shop_inventory_records';
import ShopRestockingForm from './components/Masanafu/shop/shop_restocking/shop_restocking_form';
import SalesReport from './components/Masanafu/shop/reports/sales_report/sales_report';
import ExpensesReport from './components/Masanafu/shop/reports/expenses_report/expenses_report';
import SalesVsExpenditureReport from './components/Masanafu/shop/reports/sales_vs_expenses_report/sales_v_expenditure_report';
import ShopSalesRecords from './components/Masanafu/shop/records/sales_records';
import ShopExpensesRecords from './components/Masanafu/shop/records/expenditure_records';
import PastShopReports from './components/Masanafu/shop/reports/past_reports/past_performance_report';
import SalesDataRetrieval from './components/Masanafu/shop/sales_data_retrieval/sales_data_retrieval';
import ChickenMgtDashboard from './components/Masanafu/farm/chicken_farm_mgt/chicken_mgt_dashboard';
import FeedsInventoryMenu from './components/Masanafu/farm/chicken_farm_mgt/other_menus/feeds_inventory_menu';
import MedicineInventoryMenu from './components/Masanafu/farm/chicken_farm_mgt/other_menus/medicine_inventory_menu';
import RegisterChickenFeeds from './components/Masanafu/farm/chicken_farm_mgt/chicken_feeds_inventory_mgt/chicken_feeds_registration_form';
import MasanafuChickenFeedsStockTaking from './components/Masanafu/farm/chicken_farm_mgt/chicken_feeds_inventory_mgt/chicken_feeds_stock_taking';
import ChickenFeedsInventoryRecords from './components/Masanafu/farm/chicken_farm_mgt/chicken_feeds_inventory_mgt/chicken_feeds_inventory_records';
import ChickenFeedsRestockingForm from './components/Masanafu/farm/chicken_farm_mgt/chicken_feeds_inventory_mgt/chicken_feeds_restock';
import RegisterChickenMedicine from './components/Masanafu/farm/chicken_farm_mgt/chicken_medicine_inventory_mgt/chicken_medicine_registration';
import MasanafuChickenMedicineStockTaking from './components/Masanafu/farm/chicken_farm_mgt/chicken_medicine_inventory_mgt/chicken_medicine_stock_taking';
import ChickenMedicineRestockingForm from './components/Masanafu/farm/chicken_farm_mgt/chicken_medicine_inventory_mgt/chicken_medicine_restock';
import ChickenMedicineInventoryRecords from './components/Masanafu/farm/chicken_farm_mgt/chicken_medicine_inventory_mgt/chicken_medicine_inventory_records';
import RegisterNewChickenBatch from './components/Masanafu/farm/chicken_farm_mgt/register_new_chicken_batch/register_new_chicken_batch';
import RecordChickenMortality from './components/Masanafu/farm/chicken_farm_mgt/chicken_mortality/record_chicken_mortality';
import ManageChickenVaccination from './components/Masanafu/farm/chicken_farm_mgt/manage_chicken_vaccination/chicken_vaccination';
import ManageEggProduction from './components/Masanafu/farm/chicken_farm_mgt/manage_egg_production/manage_egg_production';
import FCRCalculator from './components/Masanafu/farm/chicken_farm_mgt/FCR/FCR_calculator';
import SaveChickenFeedingRecords from './components/Masanafu/farm/chicken_farm_mgt/chicken_feeding_records/save_chicken_feeding_records';
import AllFeedingRecords from './components/Masanafu/farm/chicken_farm_mgt/chicken_feeding_records/all_feeding_records';
import ChickenMgtReport from './components/Masanafu/farm/chicken_farm_mgt/Reports/chicken_mgt_report';
import ChickenBatchRecords from './components/Masanafu/farm/chicken_farm_mgt/records/records';
import StatementReportsMenu from './components/Masanafu/shop/other_menus/statement_reports_menu';
import MasanafuDailySalesReport from './components/Masanafu/shop/statement_reports/daily_sales_report';
import MasanafuWeeklySalesReport from './components/Masanafu/shop/statement_reports/weekly_report';
import MasanafuMonthlySalesReport from './components/Masanafu/shop/statement_reports/monthly_reports';
import ExternalReceiptsRecords from './components/Masanafu/shop/external_receipts/external_receipts_records';
import MasanafuShopOutgoingRecord from './components/Masanafu/shop/shop_restocking/shop_outgoing';
import ChickenFarmStatementReport from './components/Masanafu/farm/chicken_farm_mgt/Reports/chicken_farm_statment_report';
import SaveShopExpenditureReceipts from './components/Masanafu/shop/save_shop_expenditure_receipts/save_shop_expenditure_receipts';
import MasanafuExpenseReceiptViewer from './components/Masanafu/shop/expenditure/view_expenses_receipts';
import CustodianRecordsMenu from './components/Masanafu/Custodian/other_menus.js/records_menu';
import EquatorialMassageManagerDashboard from './components/Equatorial/massage/equatorial_massage_dashboard';
import MassagePOS from './components/Equatorial/massage/pos/point_of_sale/pos';
import EquatorialMassageInventoryMgtMenu from './components/Equatorial/massage/other_menus/inventory_mgt_menu';
import EquatorialMassageDepartmentStockTaking from './components/Equatorial/massage/inventory_mgt/stock_taking';
import EquatorialMassageDepartmentOutgoingForm from './components/Equatorial/massage/inventory_mgt/inventory_outgoing';
import EquatorialMassageDepartmentInventoryRestockingForm from './components/Equatorial/massage/inventory_mgt/inventory_restocking';
import RegisterMassageServices from './components/Equatorial/massage/register_items_and_services/register_services';
import EquatorialMassageInventoryRecords from './components/Equatorial/massage/inventory_mgt/inventory_records';
import EquatorialMassageDepartmentRecords from './components/Equatorial/massage/records/equatorial_massage_department_records';
import EquatorialMassageReportMenu from './components/Equatorial/massage/other_menus/report_menu';
import EquatorialMassageDailyReport from './components/Equatorial/massage/reports/daily_report';
import EquatorialMassageWeeklyReport from './components/Equatorial/massage/reports/weekly_report';
import EquatorialMassageMonthlyReport from './components/Equatorial/massage/reports/monthly_report';
import EquatorialProjectsManagerDashboard from './components/Equatorial/projects/equatorial_projects_manager_dashboard';
import EquatorialProjectsSalesRecords from './components/Equatorial/projects/projects_records/projects_sales_records';
import EquatorialProjectsPOS from './components/Equatorial/projects/projects_pos/point_of_sale/pos';
import EquatorialProjectsExternalReceiptsPOS from './components/Equatorial/projects/projects_pos/point_of_sale/pos';
import EquatorialProjectsCreateExternalReceipts from './components/Equatorial/projects/projects_external_receipts/point_of_sale/pos';
import IssuedEquatorialProjectsExternalReceiptsRecords from './components/Equatorial/projects/projects_external_receipts/external_receipts_records/view_external_receipts';
import EquatorialProjectsDepartmentInventoryMgtMenu from './components/Equatorial/projects/other_menus/inventory_menu';
import EquatorialProjectsDepartmentReportMenu from './components/Equatorial/projects/other_menus/reports_menu';
import EquatorialNewProjectRegistration from './components/Equatorial/projects/projects_inventory/register_new_project';
import EquatorialProjectsInventoryRecords from './components/Equatorial/projects/projects_inventory/inventory_records';
import EquatorialProjectsDepartmentStockTaking from './components/Equatorial/projects/projects_inventory/stock_taking';
import EquatorialProjectsDepartmentInventoryRestockingForm from './components/Equatorial/projects/projects_inventory/inventory_restocking';
import EquatorialProjectsDepartmentOutgoingForm from './components/Equatorial/projects/projects_inventory/inventory_outgoing';
import EquatorialProjectsClientPaymentPlan from './components/Equatorial/projects/client_payment_plan/client_payment_plan';
import EquatorialProjectsDailyReport from './components/Equatorial/projects/projects_reports/daily_report';
import EquatorialProjectsWeeklyReport from './components/Equatorial/projects/projects_reports/weekly_report';
import EquatorialProjectsMonthlyReport from './components/Equatorial/projects/projects_reports/monthly_report';
import EquatorialTodayScheduledProjectsClientPayments from './components/Equatorial/projects/today_scheduled_client_payments/today_scheduled_client_payments';
import EquatorialProjectsReceiptsClientPaymentStatus from './components/Equatorial/projects/projects_receipts_payment_status/projects_receipts_payment_status';
import EquatorialShopManagerDashboard from './components/Equatorial/shop/equatorial_shop_dashboard';
import EquatorialShopInventoryManagementMenu from './components/Equatorial/shop/other_menus/inventory_mgt_menu';
import EquatorialShopNewItemRegistration from './components/Equatorial/shop/inventory/register_new_item';
import EquatorialShopStockTaking from './components/Equatorial/shop/inventory/stock_taking';
import EquatorialShopInventoryRecords from './components/Equatorial/shop/inventory/inventory_records';
import EquatorialShopInventoryRestockingForm from './components/Equatorial/shop/inventory/inventory_restocking';
import EquatorialShopOutgoingForm from './components/Equatorial/shop/inventory/inventory_outgoing';
import EquatorialShopPOS from './components/Equatorial/shop/pos/point_of_sale/pos';
import EquatorialShopSaleDataRetrieval from './components/Equatorial/shop/sale_data_retrival/equatorial_shop_sale_data_retrieval';
import RecordEquatorialShopExpenditure from './components/Equatorial/shop/expenditure/record_shop_expenditures';
import EquatorialExpenseReceiptViewer from './components/Equatorial/shop/expenditure/view_expenses_receipts';
import SaveEquatorialShopExpenditureReceipts from './components/Equatorial/shop/save_shop_expenditure_receipts/save_shop_expenditure_receipts';
import EquatorialShopDailySalesReport from './components/Equatorial/shop/statement_reports/daily_sales_report';
import EquatorialShopWeeklySalesReport from './components/Equatorial/shop/statement_reports/weekly_report';
import EquatorialShopMonthlySalesReport from './components/Equatorial/shop/statement_reports/monthly_reports';
import EquatorialStatementReportsMenu from './components/Equatorial/shop/other_menus/statement_reports_menu';
import EquatorialShopSalesRecords from './components/Equatorial/shop/records/sales_records';
import EquatorialShopExpensesRecords from './components/Equatorial/shop/records/expenditure_records';
import FetchClientAssociatedReceipts from './components/Equatorial/shop/fetch_client_associated_receipts/fetch_client_associated_receipts';
import EquatorialMassageClientServiceSubscription from './components/Equatorial/massage/client_service_subscription/client_service_subscription';
import EquatorialMassageSubscriptionsRecords from './components/Equatorial/massage/records/equatorial_massage_subscriptions_records';
import MassageDailyIncomeSubmission from './components/Equatorial/massage/income_submission/income_submission';
import EquatorialMassageServicesPos from './components/Equatorial/massage/services_pos/point_of_sale/pos';
import RecieveMassageIncome from './components/Equatorial/shop/recieve_massage_income/recieve_income';
import EquatorialMassageDailyServicesReport from './components/Equatorial/massage/reports/daily_services_report';
import EquatorialMassageWeeklyServicesReport from './components/Equatorial/massage/reports/weekly_services_report';
import EquatorialMassageMonthlyServicesReport from './components/Equatorial/massage/reports/monthly_services_report';
import ManageSuppliers from './components/Equatorial/shop/manage_suppliers/manage_suppliers';
import RecieveExhibitionIncome from './components/Equatorial/shop/exhibition_income/recieve_exhibition_income';
import EquatorialCustodianDashboard from './components/Equatorial/inventory_custodian/equatorial_custodian_dahsboard';
import MassageInventoryMenuForInventoryCustodian from './components/Equatorial/inventory_custodian/other_menus/massage_inventory_menu';
import ProjectsInventoryMenuForInventoryCustodian from './components/Equatorial/inventory_custodian/other_menus/projects_inventory_menu';
import MainShopInventoryMenuForInventoryCustodian from './components/Equatorial/inventory_custodian/other_menus/main_shop_inventory_menu';
import LabellingInventoryMenuForInventoryCustodian from './components/Equatorial/inventory_custodian/other_menus/labelling_dept_inventory_menu';
import CustodianGeneralStoreInventoryManagement from './components/Equatorial/inventory_custodian/other_menus/general_store_inventory_menu';
import CustodianReleaseInventoryMgt from './components/Equatorial/inventory_custodian/release_inventory/release_inventory';
import EquatorialGeneralStoreStockTaking from './components/Equatorial/inventory_custodian/inventory_mgt/stock_taking';
import EquatorialGeneralStoreRestockingRecords from './components/Equatorial/inventory_custodian/inventory_mgt/restocking_records';
import EquatorialGeneralStoreRestockForm from './components/Equatorial/inventory_custodian/inventory_mgt/general_store_restock_form';
import EquatorialLabellingManagerDashboard from './components/Equatorial/labelling/equatorial_labelling_dashboard';
import LabellingDepartmentStockTaking from './components/Equatorial/labelling/stock_taking/stock_taking';
import LabellingDepartmentIncomingInventoryMgt from './components/Equatorial/labelling/record_incoming_inventory/incoming_inventory_mgt';
import LabellingDepartmentInventoryTransferToCustodianMgt from './components/Equatorial/labelling/send_inventory_to_custodian/outgoing_inventory_mgt';
import LabellingDepartmentDailyOutputMgt from './components/Equatorial/labelling/daily_labelling_records/daily_output_mgt';
import EquatorialDebtManagerDashboard from './components/Equatorial/debt_manager/equatorial_debt_manager';
import ViewAllPartiallyPaidSales from './components/Equatorial/debt_manager/view_all_partially_paid_sales/view_all_partially_paid_sales';
import ViewAllUnPaidSales from './components/Equatorial/debt_manager/view_all_unpaid_sales/view_all_unpaid_sales';
import DebtManagerPOS from './components/Equatorial/debt_manager/POS/point_of_sale/pos';
import NoneCashTransactionsMgt from './components/Equatorial/debt_manager/NCTs/none_cash_transactions';
import ManageNCTs from './components/Equatorial/shop/NCTs/manage_NCTs';
import ClientProjectsUpgrade from './components/Equatorial/debt_manager/client_projects_upgrade/client_projects_upgrade';
import ChequeManagement from './components/Equatorial/shop/cheque_management/cheque_management';
import TrackDnns from './components/Equatorial/inventory_custodian/track_delivery_note_numbers/track_dnns';
import ExhibitionSalesRecords from './components/Equatorial/inventory_custodian/exhibition_sales_records/exhibition_sales_records';
import ExhibitionPOS from './components/Equatorial/inventory_custodian/exhibition_pos/point_of_sale/pos';

function App() {
  const authCtx = useContext(AuthContext);
  const logoutTimerIdRef = useRef(null);

useEffect(() => {
  const logoutUser = () => {
    localStorage.clear()
  }
  const autoLogout = () => {
    if (document.visibilityState === 'hidden') {
      const timeOutId = window.setTimeout(logoutUser, 100 * 60 * 1000);
      logoutTimerIdRef.current = timeOutId;
    } else {
      window.clearTimeout(logoutTimerIdRef.current);
    }
  };

  document.addEventListener('visibilitychange', autoLogout);

  return () => {
    document.removeEventListener('visibilitychange', autoLogout);
  };
}, []);

  return (
    <div className="App">
      <BrowserRouter>
          {!authCtx.isLoggedIn && (<Route path="/Login" >
            <Login />
          </Route>
          )}
          {!authCtx.isLoggedIn && (
            <Redirect to='/Login' />
          )}

          {/* {authCtx.isLoggedIn && (<Route path="*">
            <Redirect to={localStorage.getItem('home')} />
          </Route> )
          } */}

          {authCtx.isLoggedIn && (
            <Route path="/namungoonadashboard">
              <Namungoonadashboard />
            </Route>
          )}
          
          {authCtx.isLoggedIn && (<Route path="/saveinventoryrecords">
            <Saveinventoryrecords />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/stocktaking">
            <Stocktaking />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/manageinventory">
            <Manageinventory />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/viewinventoryrecords">
            <Viewinventoryrecords />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/registerpersonnel">
            <Registerpersonnel />
          </Route>
          )}
          {authCtx.isLoggedIn && (<Route path="/admindashboard">
            <Admindashboard />
          </Route>
          )}

            {authCtx.isLoggedIn && (
              <Route path="/managerdashboard">
                <Managerdashboard />
              </Route>
            )}

            {authCtx.isLoggedIn && (<Route path="/productorders">
              <ProductOrders />
            </Route>
            )}

          {authCtx.isLoggedIn && (
            <Route path="/inventorymenu">
              <InventoryMenu />
            </Route>
          )}


          {authCtx.isLoggedIn && (
            <Route path="/custodiandashboard">
              <CustodianDashboard />
            </Route>
          )}

          {authCtx.isLoggedIn && (
            <Route path="/exhibtionmanagement">
              <Exhibitionmanagement />
            </Route>
          )}

          {authCtx.isLoggedIn && (
            <Route path="/exhibtionrecords">
              <ExhibitionRecords />
            </Route>
          )}

          {authCtx.isLoggedIn && (<Route path="/accountsettings">
            <AccountSettings />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/requestrawmaterials">
            <RequestRawMaterialsForm />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/placeproductorder">
            <PlaceOrderForm />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/orderrecords">
            <OrderRecords />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/branchorderrecords">
            <BranchOrderRecords />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/approvedorders">
            <ApprovedOrders />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/rawmaterialrequests">
            <RawMaterialRequests />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/rawmaterialrequestsrecords">
            <RawMaterialRequestsRecords />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/productionrecords">
            <ProductionRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/farmmanagerdashboard">
            <FarmDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/requestseeds">
            <RequestSeeds />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/managebatch">
            <ManageBatch />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/farmrequests">
            <FarmRequests />
          </Route>)}  
          {authCtx.isLoggedIn && (<Route path="/farmrequisitionstatus">
            <RequisitionStatus />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/viewrecords">
            <ViewBatchRecords />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/projectsmanagerdashboard">
            <ProjectsManagerDashboard />
          </Route>)}  
          {authCtx.isLoggedIn && (<Route path="/materialcalculator">
            <MaterialCalculator />
          </Route>)}
          {/* {authCtx.isLoggedIn && (<Route path="/pendingprojectsorders">
            <PendingProjectOrders />
          </Route>)}     */}
          {/* {authCtx.isLoggedIn && (<Route path="/ordersstatus">
            <OrderStatus />
          </Route>)} */}
          {authCtx.isLoggedIn && (<Route path="/makeprojectsorder">
            <MakeProjectsOrder />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/managemachinerydata">
            <AddmachineryData />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/machinerymenu">
            <MachineryMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/registerequipment">
            <RegisterMaterial />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/registerproject">
            <SaveNewProject />
          </Route>)}      
          {authCtx.isLoggedIn && (<Route path="/shopmanagerdashboard">
            <ShopDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/pointofsale">
            <POS />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/registershopinventory">
            <RegisterShopInventory />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/startbatchfrommothergarden">
            <StartBatchFromMotherGarden />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/projectsrecords">
            <ProjectsRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/projectsrequests">
            <ProjectsEquipmentRequests />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/requestprojectsequipment">
            <RequestEquipment />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/projectsrequestsrecords">
            <ProjectsRequestsRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/farmrequestsrecords">
            <FarmRequestsRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/orderdelivery">
            <OrderDelivery />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopinventorymenu">
            <InventoryManagementMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopgraphicsreportsmenu">
            <ReportsMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/recordmasanafushopexpenditure">
            <RecordShopExpenditure />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/manageexternalreceipts">
            <ManageExternalReceipts />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/shopstocktaking">
            <ShopStockTaking />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopinventoryrecords">
            <ShopInventoryRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushoprestockingform">
            <ShopRestockingForm />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopsalesreport">
            <SalesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopexpensesreport">
            <ExpensesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopsalesvexpenditurereport">
            <SalesVsExpenditureReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopsalesrecords">
            <ShopSalesRecords />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/masanafushopexpenditurerecords">
            <ShopExpensesRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushoppastreports">
            <PastShopReports />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/updatesaledata">
            <SalesDataRetrieval />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/chickenfarmmanagerdashboard">
            <ChickenMgtDashboard />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/masanafuchickenfeedsmgt">
            <FeedsInventoryMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafuchickenmedicinemgt">
            <MedicineInventoryMenu />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/registerchickenfeeds">
            <RegisterChickenFeeds />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafuchickenfeedsstocktaking">
            <MasanafuChickenFeedsStockTaking />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafuchickenfeedsinventoryrecords">
            <ChickenFeedsInventoryRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafuchickenfeedsrestockingform">
            <ChickenFeedsRestockingForm />
          </Route>)}
          

          {authCtx.isLoggedIn && (<Route path="/registerchickenmedicine">
            <RegisterChickenMedicine />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafuchickenmedicinestocktaking">
            <MasanafuChickenMedicineStockTaking />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafuchickenmedicineinventoryrecords">
            <ChickenMedicineInventoryRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafuchickenmedicinerestockingform">
            <ChickenMedicineRestockingForm />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/masanafuregisternewchickenbatch">
            <RegisterNewChickenBatch />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafurecordchickendeath">
            <RecordChickenMortality />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafuchickenhealthmgt">
            <ManageChickenVaccination />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/masanafuchickeneggproductionmgt">
            <ManageEggProduction />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/calculatebatchfcr">
            <FCRCalculator />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/recordbatchfeedingrecord">
            <SaveChickenFeedingRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/allfeedingrecords">
            <AllFeedingRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/chickenfarmreport">
            <ChickenMgtReport />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/chickenbatchrecords">
            <ChickenBatchRecords />
          </Route>)}


          {authCtx.isLoggedIn && (<Route path="/masanafushopstatementreportsmenu">
            <StatementReportsMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopdailysalesreport">
            <MasanafuDailySalesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopweeklysalesreport">
            <MasanafuWeeklySalesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafushopmonthlysalesreport">
            <MasanafuMonthlySalesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafuexternalreceiptsrecords">
            <ExternalReceiptsRecords />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/recordmasanafushopoutgoing">
            <MasanafuShopOutgoingRecord />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/chickenfarmstatementreport">
            <ChickenFarmStatementReport />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/savemasanafuexpenditurereceipts">
            <SaveShopExpenditureReceipts />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/viewmasanafushopexpensesreceipts">
            <MasanafuExpenseReceiptViewer />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/masanafucustodianrecordsmenu">
            <CustodianRecordsMenu />
          </Route>)}


          {authCtx.isLoggedIn && (<Route path="/massagemanagerdashboard">
            <EquatorialMassageManagerDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassagedepartmentpos">
            <MassagePOS />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassageservicespos">
            <EquatorialMassageServicesPos />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassagedepartmentinventorymenu">
            <EquatorialMassageInventoryMgtMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassagestocktaking">
            <EquatorialMassageDepartmentStockTaking />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/recordequatorialmassageinventoryoutgoings">
            <EquatorialMassageDepartmentOutgoingForm />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/recordequatorialmassageinventoryrestocking">
            <EquatorialMassageDepartmentInventoryRestockingForm />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/registermassageservice">
            <RegisterMassageServices />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassageinventoryrecords">
            <EquatorialMassageInventoryRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassagedepartmentrecords">
            <EquatorialMassageDepartmentRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassagedepartmentreportsmenu">
            <EquatorialMassageReportMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassagedepartmentdailyreport">
            <EquatorialMassageDailyReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassagedepartmentweeklyreport">
            <EquatorialMassageWeeklyReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassagedepartmentmonthlyreport">
            <EquatorialMassageMonthlyReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/manageequatorialmassageclientservicesubscription">
            <EquatorialMassageClientServiceSubscription />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassageclientsubscriptionrecords">
            <EquatorialMassageSubscriptionsRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/massagedailyincomesubmission">
            <MassageDailyIncomeSubmission />
          </Route>)}


          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsmanagerdashboard">
            <EquatorialProjectsManagerDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectssalesrecords">
            <EquatorialProjectsSalesRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectspos">
            <EquatorialProjectsPOS />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/createexternalreceipt">
            <EquatorialProjectsCreateExternalReceipts />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/equatorialissuedexternalreceiptsrecords">
            <IssuedEquatorialProjectsExternalReceiptsRecords />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsinventorymenu">
            <EquatorialProjectsDepartmentInventoryMgtMenu />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsreportsmenu">
            <EquatorialProjectsDepartmentReportMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialnewprojectregistration">
            <EquatorialNewProjectRegistration />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsinventoryrecords">
            <EquatorialProjectsInventoryRecords />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsdepartmentstocktaking">
            <EquatorialProjectsDepartmentStockTaking />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsdepartmentrestockform">
            <EquatorialProjectsDepartmentInventoryRestockingForm />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsdepartmentoutgoingform">
            <EquatorialProjectsDepartmentOutgoingForm />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsclientpaymentplan">
            <EquatorialProjectsClientPaymentPlan />
          </Route>)} 
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsdepartmentdailyreport">
            <EquatorialProjectsDailyReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsdepartmentweeklyreport">
            <EquatorialProjectsWeeklyReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsdepartmentmonthlyreport">
            <EquatorialProjectsMonthlyReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialtodayscheduledprojectsclientpayments">
            <EquatorialTodayScheduledProjectsClientPayments />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialprojectsreceiptspaymentstatus">
            <EquatorialProjectsReceiptsClientPaymentStatus />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/equatorialshopmanagerdashboard">
            <EquatorialShopManagerDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopinventorymenu">
            <EquatorialShopInventoryManagementMenu />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopnewitemregistration">
            <EquatorialShopNewItemRegistration />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopstocktaking">
            <EquatorialShopStockTaking />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopinventoryrecords">
            <EquatorialShopInventoryRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshoprestockingform">
            <EquatorialShopInventoryRestockingForm />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopoutgoingform">
            <EquatorialShopOutgoingForm />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopPOS">
            <EquatorialShopPOS />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopsalesdataretrieval">
            <EquatorialShopSaleDataRetrieval />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/recordequatorialexpenditure">
            <RecordEquatorialShopExpenditure />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/viewequatorialexpenditurereceipts">
            <EquatorialExpenseReceiptViewer />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/saveequatorialexpenditurereceipts">
            <SaveEquatorialShopExpenditureReceipts />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopdailyreport">
            <EquatorialShopDailySalesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopweeklyreport">
            <EquatorialShopWeeklySalesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopmonthlyreport">
            <EquatorialShopMonthlySalesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopreports">
            <EquatorialStatementReportsMenu />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/equatorialshopsalesrecords">
            <EquatorialShopSalesRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopexpensesrecords">
            <EquatorialShopExpensesRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialshopexpensesrecords">
            <EquatorialShopExpensesRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/fetchclientassociatedreceipts">
            <FetchClientAssociatedReceipts />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/recievemassagedepartmentincome">
            <RecieveMassageIncome />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/recieveexhibitionincome">
            <RecieveExhibitionIncome />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/equatorialmassagedailyservicesreport">
            <EquatorialMassageDailyServicesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassageweeklyservicesreport">
            <EquatorialMassageWeeklyServicesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialmassagemonthlyservicesreport">
            <EquatorialMassageMonthlyServicesReport />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/managesuppliers">
            <ManageSuppliers />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/equatorialinventorycustodiandashboard">
            <EquatorialCustodianDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/custodianequatorialmassageinventorymanagement">
            <MassageInventoryMenuForInventoryCustodian />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/custodianequatorialprojectsinventorymanagement">
            <ProjectsInventoryMenuForInventoryCustodian />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/custodianequatorialshopinventorymanagement">
            <MainShopInventoryMenuForInventoryCustodian />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/labellinginventorymanagement">
            <LabellingInventoryMenuForInventoryCustodian />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/generalinventorymanagement">
            <CustodianGeneralStoreInventoryManagement />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/custodianreleaseinventorymgt">
            <CustodianReleaseInventoryMgt />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialgeneralstorestocktaking">
            <EquatorialGeneralStoreStockTaking />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialgeneralstorerestockingrecords">
            <EquatorialGeneralStoreRestockingRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatorialgeneralstorerestockingform">
            <EquatorialGeneralStoreRestockForm />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/equatoriallabellingmanagerdashboard">
            <EquatorialLabellingManagerDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatoriallabellingstorestocktaking">
            <LabellingDepartmentStockTaking />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatoriallabellingincominginventorymgt">
            <LabellingDepartmentIncomingInventoryMgt />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatoriallabellinginventorytransfermgt">
            <LabellingDepartmentInventoryTransferToCustodianMgt />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/equatoriallabellingdailyoutputmgt">
            <LabellingDepartmentDailyOutputMgt />
          </Route>)}


          {authCtx.isLoggedIn && (<Route path="/equatorialdebtmanagerdashboard">
            <EquatorialDebtManagerDashboard />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/viewallpartiallypaidshopsales">
            <ViewAllPartiallyPaidSales />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/viewallunpaidshopsales">
            <ViewAllUnPaidSales />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/debtmanagerpos">
            <DebtManagerPOS />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/managenonecashtransactions">
            <NoneCashTransactionsMgt />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/managenctsbydebtmanager">
            <ManageNCTs />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/manageclientprojectsupgrades">
            <ClientProjectsUpgrade />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/managecheques">
            <ChequeManagement />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/trackequatorialdnns">
            <TrackDnns />
          </Route>)}

          {authCtx.isLoggedIn && (<Route path="/exhibitionsalesrecords">
            <ExhibitionSalesRecords />
          </Route>)}
          {authCtx.isLoggedIn && (<Route path="/exhibitionpos">
            <ExhibitionPOS />
          </Route>)}
      </BrowserRouter>
    </div>
  );
}

export default App;
