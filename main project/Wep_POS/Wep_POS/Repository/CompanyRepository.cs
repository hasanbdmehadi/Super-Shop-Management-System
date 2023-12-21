using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wep_POS.IRepository;

namespace Wep_POS.Repository
{
    public class CompanyRepository : ICompanyRrpository
    {
        POSEntities dbc = new POSEntities();
        public void AddCompany(Company aTbl_Company)
        {
            dbc.Companies.Add(aTbl_Company);
            dbc.SaveChanges();
        }
        
       
       

        public void UpdateCompany(Company aTbl_Company)
        {
            Company dbCompaney = GetTbl_CompanyById(aTbl_Company.Company_SlNo);
            dbCompaney.Company_Name = aTbl_Company.Company_Name;
            dbCompaney.Company_Description = aTbl_Company.Company_Description;
           
            dbc.SaveChanges();
        }
        public void DeleteCompany(int Company_SlNo)
        {
            Company Product = GetTbl_CompanyById(Company_SlNo);
            dbc.Companies.Remove(Product);
            dbc.SaveChanges();
        }


        public List<Company> GetAllTbl_Company()
        {
            return dbc.Companies.ToList();
        }


        public Company GetTbl_CompanyById(int Company_SlNo)
        {
            return dbc.Companies.SingleOrDefault(p => p.Company_SlNo == Company_SlNo);
        }
    }
}