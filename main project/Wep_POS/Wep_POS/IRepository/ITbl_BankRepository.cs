using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wep_POS.IRepository
{
    public interface ITbl_BankRepository
    {
        void AddBank(Bank aBank);
        void UpdateBank(Bank aBank);
        void DeleteBank(int BankSlNo);
        List<Bank> GetAllBank();
        Bank GetBankById(int BankSlNo);

    }
}
