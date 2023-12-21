using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wep_POS.IRepository
{
   public interface IProductCategoryRepository
    {
       void Add(ProductCategory aProductCategory);
       void Update(ProductCategory aProductCategory);
       void Delete(int ProductCategory_SlNo);
       List<ProductCategory> GetAllProductCategory();
       ProductCategory GetProductCategoryById(int ProductCategory_SlNo);


    }
}
