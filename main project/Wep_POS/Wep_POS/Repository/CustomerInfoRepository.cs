using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wep_POS.IRepository;

namespace Wep_POS.Repository
{
    public class CustomerInfoRepository : ICustomerInfoRepository
    {
        POSEntities db = new POSEntities();
        public void AddCustomerInfo(CustomerInfo aCustomerInfo)
        {
            db.CustomerInfoes.Add(aCustomerInfo);
            db.SaveChanges();
        }

        public void UpdateCustomerInfo(CustomerInfo aCustomerInfo)
        {
            CustomerInfo dbcompaney = GetCustomerInfoById(aCustomerInfo.CustomerSlNo);
            dbcompaney.CustomerCode = aCustomerInfo.CustomerCode;
            dbcompaney.CustomerName = aCustomerInfo.CustomerName;
            dbcompaney.CustomerType = aCustomerInfo.CustomerType;
            dbcompaney.Propietor = aCustomerInfo.Propietor;
            dbcompaney.ContactPerson = aCustomerInfo.ContactPerson;
            dbcompaney.Address = aCustomerInfo.Address;
            dbcompaney.Phone = aCustomerInfo.Phone;
            dbcompaney.Mobile = aCustomerInfo.Mobile;
            dbcompaney.eMail = aCustomerInfo.eMail;
            dbcompaney.VATRegNo = aCustomerInfo.VATRegNo;
            dbcompaney.DiscountPercent = aCustomerInfo.DiscountPercent;
            dbcompaney.DistributorPoint = aCustomerInfo.DistributorPoint;
            db.SaveChanges();
            
        }

        public void DeleteCustomerInfo(int CustomerSlNo)
        {
            CustomerInfo customer = GetCustomerInfoById(CustomerSlNo);
            db.CustomerInfoes.Remove(customer);
            db.SaveChanges();
        }

        public List<CustomerInfo> GetAllCustomerInfo()
        {
           return db.CustomerInfoes.ToList();
        }

        public CustomerInfo GetCustomerInfoById(int CustomerSlNo)
        {
            return db.CustomerInfoes.SingleOrDefault(p => p.CustomerSlNo == CustomerSlNo);
        }
    }
}