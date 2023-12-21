using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wep_POS.IRepository
{
  public interface ICompanyRrpository
    {
      void AddCompany(Company aTbl_Company);
      void UpdateCompany(Company aTbl_Company);
      void DeleteCompany(int Company_SlNo);
      List<Company> GetAllTbl_Company();
      Company GetTbl_CompanyById(int Company_SlNo);
    }
}
