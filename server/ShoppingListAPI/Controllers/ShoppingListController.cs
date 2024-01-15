using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace ShoppingListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]



    public class ShoppingListController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ShoppingListController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetCategories")]
        public JsonResult GetCategories()
        {
            string query = "SELECT * FROM dbo.categories";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("shoppingListDBCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }



        [HttpPost]
        [Route("InsertOrder")]
        public async Task<IActionResult> InsertOrder([FromBody] OrderDetails orderDetails)
        {
            try
            {
                string sqlDatasource = _configuration.GetConnectionString("shoppingListDBCon");

                using (SqlConnection myCon = new SqlConnection(sqlDatasource))
                {
                    await myCon.OpenAsync();

                    string insertQuery = "INSERT INTO dbo.orders ([userName], [address], [mail], [items]) VALUES (@UserName, @Address, @Mail, @Items)";

                    using (SqlCommand myCommand = new SqlCommand(insertQuery, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@UserName", orderDetails.UserName);
                        myCommand.Parameters.AddWithValue("@Address", orderDetails.Address);
                        myCommand.Parameters.AddWithValue("@Mail", orderDetails.Mail);
                        myCommand.Parameters.AddWithValue("@Items", JsonConvert.SerializeObject(orderDetails.Items));

                        await myCommand.ExecuteNonQueryAsync();
                    }
                }

                return Ok("Order inserted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }





    }
}
