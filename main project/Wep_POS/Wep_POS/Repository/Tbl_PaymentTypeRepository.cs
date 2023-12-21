using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Wep_POS.IRepository;

namespace Wep_POS.Repository
{
    public class Tbl_PaymentTypeRepository : ITbl_PaymentTypeRepository
    {
        POSEntities db = new POSEntities();
        public void AddPaymentType(PaymentType aPaymentType)
        {
            db.PaymentTypes.Add(aPaymentType);
            db.SaveChanges();
        }

        public void UpdatePaymentType(PaymentType aPaymentType)
        {
            PaymentType dbpayment = GetPaymentTypeById(aPaymentType.PaymentTypeSlNo);
            dbpayment.PaymentTypeName = aPaymentType.PaymentTypeName;
            db.SaveChanges();
            

        }

        public void DeletePaymentType(int PaymentTypeSlNo)
        {

            PaymentType payment = GetPaymentTypeById(PaymentTypeSlNo);
            db.PaymentTypes.Remove(payment);
            db.SaveChanges();
        }

        public List<PaymentType> GetAllPaymentType()
        {
            return db.PaymentTypes.ToList();
        }

        public PaymentType GetPaymentTypeById(int PaymentTypeSlNo)
        {
            return db.PaymentTypes.SingleOrDefault(p => p.PaymentTypeSlNo == PaymentTypeSlNo);
        }
    }
}