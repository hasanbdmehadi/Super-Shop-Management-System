using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wep_POS.IRepository
{
   public interface IProductInfoRepository
    {
        void AddProductInfo(ProductInfo aProductInfo);
        void UpdateProductInfo(ProductInfo aProductInfo);
        void DeleteProductInfo(int Product_SlNo);
        List<ProductInfo> GetAllProductInfo();
        ProductInfo GetProductInfoById(int Product_SlNo);
    }
}
