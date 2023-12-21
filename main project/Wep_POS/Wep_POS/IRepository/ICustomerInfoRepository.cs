using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wep_POS.IRepository
{
   public interface ICustomerInfoRepository
    {
       void AddCustomerInfo(CustomerInfo aCustomerInfo);
       void UpdateCustomerInfo(CustomerInfo aCustomerInfo);
       void DeleteCustomerInfo(int CustomerSlNo);
       List<CustomerInfo> GetAllCustomerInfo();
       CustomerInfo GetCustomerInfoById(int CustomerSlNo);
       
    }
}
