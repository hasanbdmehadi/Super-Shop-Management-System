using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Wep_POS.IRepository;
using Wep_POS.Repository;

namespace Wep_POS.Controllers
{
    public class POSController : Controller
    {
        //
        // GET: /POS/

        static readonly IProductCategoryRepository _Product = new ProductCategoryRepository();
        static readonly IProductInfoRepository _Productinfo = new ProductInfoRepository();
        static readonly IBranchRepository _branch = new BranchRepository();
        static readonly ICompanyRrpository _company = new CompanyRepository();
        static readonly ITbl_PaymentTypeRepository _payment = new Tbl_PaymentTypeRepository();
        static readonly CustomerInfoRepository _customer = new CustomerInfoRepository();

        static readonly ITbl_BankRepository _Bank = new Tbl_BankRepository();

        public ActionResult Index()
        {
            return View();
        }

        #region ProductCategory
        public ActionResult ProductCategory()
        {           
            return View();
        }

        public void Add(ProductCategory aProductCategory)
        {
            aProductCategory.Status = "A";
            aProductCategory.Creator = "LUT";
            aProductCategory.CreationDate = System.DateTime.Now;
            _Product.Add(aProductCategory);
        }
        public void Update(ProductCategory aProductCategory)
        {
            aProductCategory.Modifier = "LUT";
            aProductCategory.ModificationDate = System.DateTime.Now;
            _Product.Update(aProductCategory);
        }
       
        public void Delete(int ProductCategory_SlNo)
        {
            _Product.Delete(ProductCategory_SlNo);
        }
        public JsonResult GetAllProductCategory()
        {
            List<ProductCategory> ListProduct = _Product.GetAllProductCategory();
            return Json(ListProduct);
        }
        public JsonResult GetProductCategoryById(int ProductCategory_SlNo)
        {
            ProductCategory product = _Product.GetProductCategoryById(ProductCategory_SlNo);
            return Json(product);
        }



        //Gried
        public JsonResult ProductCategoryDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<ProductCategory> listBranch = _Product.GetAllProductCategory();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listBranch.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listBranch.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.ProductCategory_SlNo);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.ProductCategory_SlNo,
                            cell = new object[]
                           {   
                               p.ProductCategory_SlNo,
                               p.ProductCategory_Name,
                               p.Creator,
                              
                               p.CreationDate
                              
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        //    end Gried
        #endregion ProductCategory


        #region ProductInfo
        public ActionResult ProductInfo()
        {
            IEnumerable<ProductCategory> listProduct = _Product.GetAllProductCategory();
            var ListProdutCategory = new SelectList(listProduct, "ProductCategory_SlNo", "ProductCategory_Name", "");
            ViewData["VdProductList"] = ListProdutCategory;

            return View();
        }

        public void AddProductInfo(ProductInfo aProductInfo)
        {
            aProductInfo.Creator = "LUT";
            aProductInfo.CreationDate = System.DateTime.Now;
            _Productinfo.AddProductInfo(aProductInfo);
        }
        public void UpdateProductInfo(ProductInfo aProductInfo)
        {
            aProductInfo.Modifier = "LUT";
            aProductInfo.ModificationDate = System.DateTime.Now;
            _Productinfo.UpdateProductInfo(aProductInfo);
        }

        public void DeleteProductInfo(int Product_SlNo)
        {
            _Productinfo.DeleteProductInfo(Product_SlNo);
        }
        public JsonResult GetAllProductInfo()
        {
            List<ProductInfo> ListProduct = _Productinfo.GetAllProductInfo();
            return Json(ListProduct);
        }
        public JsonResult GetProductInfoById(int Product_SlNo)
        {
            ProductInfo product = _Productinfo.GetProductInfoById(Product_SlNo);
            return Json(product);
        }
        //Gried
        public JsonResult ProductInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<ProductInfo> listProductInfo = _Productinfo.GetAllProductInfo();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listProductInfo.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listProductInfo.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.Product_SlNo);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.Product_SlNo,
                            cell = new object[]
                           {   
                              p.Product_SlNo,
                               p.ProductCode,
                               p.ProductName,
                               p.Product_Barcode,
                               p.ProductType,
                               p.ProductCategory_SlNo,
                               p.ReorderLevel,
                               p.Purchase_Rate,
                               p.Sell_Rate,
                               p.Note
                               
                              
                               
                              
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        //    end Gried

        #endregion ProductInfo


        #region Tbl_Company
     
        public ActionResult Company()
        {
            return View();
        }
        public void AddCompany(Company aTbl_Company)
        {
            _company.AddCompany(aTbl_Company);
        }
        public void UpdateCompany(Company aTbl_Company)
        {
            _company.UpdateCompany(aTbl_Company);
        }
        public void DeleteCompany(int Company_SlNo)
        {
            _company.DeleteCompany(Company_SlNo);
        }
        public JsonResult GetAllTbl_Company()
        {
            List<Company> ListCompany = _company.GetAllTbl_Company();
            return Json(ListCompany);
        }
        public JsonResult GetTbl_CompanyById(int Company_SlNo)
        {
            Company company = _company.GetTbl_CompanyById(Company_SlNo);
            return Json(company);
        }
        //Gried
        public JsonResult CompanyDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<Company> listBranch = _company.GetAllTbl_Company();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listBranch.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listBranch.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.Company_SlNo);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.Company_SlNo,
                            cell = new object[]
                           {   
                               p.Company_SlNo,
                               p.Company_Name,
                               p.Company_Description
                              
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        //    end Gried
        #endregion


        #region Branch

        public ActionResult Branch()
        {
            {
                IEnumerable<Branch> listBranch = _branch.GetAllBranch();
                var ListBranch = new SelectList(listBranch, "BranchSlNo", "BranchName", "");
                ViewData["VdBankList"] = ListBranch;
                IEnumerable<Company> listCompany = _company.GetAllTbl_Company();
                var ListCompany = new SelectList(listCompany, "Company_SlNo", "Company_Name", "");
                ViewData["VdCompanyList"] = ListCompany;
                return View();
               
               
               
                //return View();
            }
        }
       
        public void AddBranch(Branch aBranch)
        {
         
            aBranch.Creator = "LUT";
            aBranch.Modifier = "LUT";
            aBranch.CreationDate = System.DateTime.Now;
            aBranch.ModificationDate = System.DateTime.Now;
            aBranch.Status ="A";

            _branch.AddBranch(aBranch);
        }
        public void UpdateBranch(Branch aBranch)
        {
            // aBranch.Creator = "Test1";
            aBranch.CreationDate = System.DateTime.Now;
            // aBranch.Modifier = "Test2";

            aBranch.ModificationDate = System.DateTime.Now;


            _branch.UpdateBranch(aBranch);
        }
        public void DeleteBranch(int BranchSlNo)
        {
            _branch.DeleteBranch(BranchSlNo);
        }

        public JsonResult GetAllBranch()
        {
            List<Branch> ListBranch = _branch.GetAllBranch();
            return Json(ListBranch);
        }
        public JsonResult GetBranchById(int BranchSlNo)
        {
            Branch branch = _branch.GetBranchById(BranchSlNo);
            return Json(branch);
        }
        //Gried
        public JsonResult BranchDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<Branch> listBranch = _branch.GetAllBranch();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listBranch.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listBranch.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.BranchSlNo);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.BranchSlNo,
                            cell = new object[]
                           {   
                               p.BranchSlNo,
                               p.BranchName,
                               p.Address,
                               p.Company_SlNo,
                               p.BankSlNo,
                               p.Phone,
                               p.Mobile,
                               p.Email,
                               p.Note,
                               p.Creator,
                               p.CreationDate,
                               p.Modifier,
                               p.ModificationDate
                              
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        //    end Gried
        #endregion


        #region Bank
        public ActionResult Tbl_Bank()
        {
            IEnumerable<Company> listCompany = _company.GetAllTbl_Company();
            var ListCompany = new SelectList(listCompany, "Company_SlNo", "Company_Name", "");
            ViewData["VdCompanyList"] = ListCompany;
            return View();
           
        }

        public void AddBank(Bank aBank)
        {
           
            aBank.Creator = "LUT";
            aBank.CreationDate = System.DateTime.Now;
            aBank.Modifier = "LUT";
            aBank.ModificationDate = System.DateTime.Now;
            _Bank.AddBank(aBank);
        }
        public void UpdateBank(Bank aBank)
        {
            aBank.Creator = "LUT";
            aBank.CreationDate = System.DateTime.Now;
            aBank.Modifier = "LUT";
            aBank.ModificationDate = System.DateTime.Now;

           _Bank.UpdateBank(aBank);
        }

        public void DeleteBank(int BankSlNo)
        {
            _Bank.DeleteBank(BankSlNo);
        }
        public JsonResult GetAllBank()
        {
            List<Bank> ListBank = _Bank.GetAllBank();
            return Json(ListBank);
        }
        public JsonResult GetBankById(int BankSlNo)
        {
            Bank product = _Bank.GetBankById(BankSlNo);
            return Json(product);
        }

        //Gried
        public JsonResult BankDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<Bank> listBranch = _Bank.GetAllBank();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listBranch.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listBranch.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.BankSlNo);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.BankSlNo,
                            cell = new object[]
                           {   
                               p.BankSlNo,
                               p.Company_SlNo,
                               p.BankName,
                               p.Note,
                              
                               
                              
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        //    end Gried
        #endregion


        #region  PaymentType
        public ActionResult Tbl_PaymentType()
        {
            return View();
        }
        public void AddPaymentType(PaymentType aPaymentType)
        {
            aPaymentType.Creator = "LUT";
            aPaymentType.CreationDate = System.DateTime.Now;
            aPaymentType.Modifier = "LUT";
            aPaymentType.ModificationDate = System.DateTime.Now;
            
            _payment.AddPaymentType(aPaymentType);
        }
        public void UpdatePaymentType(PaymentType aPaymentType)
        {

            _payment.UpdatePaymentType(aPaymentType);
        }

        public void DeletePaymentType(int PaymentTypeSlNo)
        {
            _payment.DeletePaymentType(PaymentTypeSlNo);
        }
        public JsonResult GetAllPaymentType()
        {
            List<PaymentType> ListPayment = _payment.GetAllPaymentType();
            return Json(ListPayment);
        }
        public JsonResult GetPaymentTypeById(int PaymentTypeSlNo)
        {
            PaymentType payment = _payment.GetPaymentTypeById(PaymentTypeSlNo);
            return Json(payment);
        }

        //Gried
        public JsonResult PaymentTypeDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<PaymentType> ListPaymentType = _payment.GetAllPaymentType();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = ListPaymentType.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = ListPaymentType.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.PaymentTypeSlNo);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.PaymentTypeSlNo,
                            cell = new object[]
                           {   
                               p.PaymentTypeSlNo,
                               p.PaymentTypeName
                               //p.Creator,
                               //p.CreationDate,
                               //p.Modifier
                               //p.ModificationDate
                              
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        //    end Gried
        #endregion


      #region CustomerInfo
        public ActionResult CustomerInfo()
        {
            return View();

        }
        public void AddCustomerInfo(CustomerInfo aCustomerInfo)
        {
            aCustomerInfo.Creator = "LUT";
            aCustomerInfo.CreationDate = System.DateTime.Now;
            aCustomerInfo.Modifier = "LUT";
            aCustomerInfo.ModificationDate = System.DateTime.Now;
            _customer.AddCustomerInfo(aCustomerInfo);
        }
        public void UpdateCustomerInfo(CustomerInfo aCustomerInfo)
        {
            _customer.UpdateCustomerInfo(aCustomerInfo);
        }

        public void DeleteCustomerInfo(int CustomerSlNo)
        {
            _customer.DeleteCustomerInfo(CustomerSlNo);
        }

        public JsonResult GetAllCustomerInfo()
        {
            List<CustomerInfo> ListCustomerInfo = _customer.GetAllCustomerInfo();
            return Json(ListCustomerInfo);
        }
        public JsonResult GetCustomerInfoById(int CustomerSlNo)
        {
            CustomerInfo customerinfo = _customer.GetCustomerInfoById(CustomerSlNo);
            return Json(customerinfo);
        }
        //Gried
        public JsonResult CustomerInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<CustomerInfo> listCustomer = _customer.GetAllCustomerInfo();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listCustomer.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listCustomer.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.CustomerSlNo);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.CustomerSlNo,
                            cell = new object[]
                           {   
                               p.CustomerSlNo,
                               p.CustomerCode,
                               p.CustomerName,
                               p.CustomerType,
                               p.Propietor,
                               p.ContactPerson,
                               p.Address,
                               p.Phone,
                               p.Mobile,
                               p.eMail,
                              p.VATRegNo,
                              p.DiscountPercent,
                              p.DistributorPoint
                             
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        //    end Gried
        #endregion
    }
}

 