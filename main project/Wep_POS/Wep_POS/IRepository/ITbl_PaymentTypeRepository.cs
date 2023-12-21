using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wep_POS.IRepository
{
    public interface ITbl_PaymentTypeRepository
    {
        void AddPaymentType(PaymentType aPaymentType);
        void UpdatePaymentType(PaymentType aPaymentType);
        void DeletePaymentType(int PaymentTypeSlNo);
        List<PaymentType> GetAllPaymentType();
        PaymentType GetPaymentTypeById(int PaymentTypeSlNo);
    }
}
