using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//controller responds to webAPI requests
[ApiController]
//definition of route for controller with a token [controller]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{

}