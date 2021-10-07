using Abp.Domain.Repositories;
using LibraryManager.AppEntities.Bills;
using LibraryManager.AppEntities.Customers;
using LibraryManager.Catalog.Dashboard.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Dashboard
{
    public class DashboardAppService : LibraryManagerAppServiceBase, IDashboardAppService
    {
        private readonly IRepository<BillEntity, int> _billRepos;
        private readonly IRepository<CustomerEntity, int> _cusRepos;
        public DashboardAppService(
            IRepository<BillEntity, int> billRepos,
            IRepository<CustomerEntity, int> cusRepos)
        {
            _billRepos = billRepos;
            _cusRepos = cusRepos;
        }

        public async Task<List<RevenueByMonthDto>> GetRevenueByMonth(int year)
        {
            var revenue = new List<RevenueByMonthDto>();
            var query = _billRepos.GetAll().Where(x => x.DateCreated.Year == DateTime.Now.Year);
            var data = await query.ToListAsync();
            for (int i = 1; i < 13; i++)
            {
                double sum = 0;
                foreach (var item in data)
                {
                    if (item.DateCreated.Month == i)
                    {
                        sum += item.TotalPrice;
                        
                    }
                }
                var revenueItem = new RevenueByMonthDto
                {
                    month = "Tháng " + i.ToString(),
                    Revenue = sum
                };
                revenue.Add(revenueItem);
            }

            return revenue;
        }

        public async Task<double> GetRevenueInCurentDay()
        {
            var query = _billRepos.GetAll().Where(x => x.DateCreated.Date == DateTime.Now.Date);
            var data = await query.ToListAsync();
            double revenue = 0;
            foreach (var item in data)
            {
                revenue += item.TotalPrice;
            }

            return revenue;
        }

        public async Task<int> GetTotalBill()
        {
            var query = _billRepos.GetAll().Where(x => x.DateCreated.Date == DateTime.Now.Date);
            var totalBill = await query.CountAsync();

            return totalBill;
        }


        public async Task<int> GetAllCustomer()
        {
            var query = _cusRepos.GetAll();
            var totalCus = await query.CountAsync();

            return totalCus;
        }

        public async Task<List<CustomerByMonthDto>> GetCustomerByMonth(int year)
        {
            var revenue = new List<CustomerByMonthDto>();
            var query = _cusRepos.GetAll().Where(x => x.DateCreated.Year == DateTime.Now.Year);
            var data = await query.ToListAsync();
            for (int i = 1; i < 13; i++)
            {
                double sum = 0;
                foreach (var item in data)
                {
                    if (item.DateCreated.Month == i)
                    {
                        sum += 1;

                    }
                }
                var revenueItem = new CustomerByMonthDto
                {
                    month = "Tháng " + i.ToString(),
                    Customer = sum
                };
                revenue.Add(revenueItem);
            }

            return revenue;
        }
    }
}
