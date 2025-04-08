using CloudinaryASP1.Service;
using Microsoft.AspNetCore.Mvc;
using CloudinaryASP1.Models;

namespace CloudinaryASP1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CloudinaryController : ControllerBase
    {
        private readonly CloudinaryService _cloudinaryService;

        public CloudinaryController(CloudinaryService cloudinaryService)
        {
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllImages()
        {
            var images = await _cloudinaryService.GetAllImagesAsync();
            return Ok(images);
        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromBody] UploadRequest request)
        {
            if (string.IsNullOrEmpty(request.FilePath) || string.IsNullOrEmpty(request.PublicId))
                return BadRequest("filePath and publicId are required");

            var result = await _cloudinaryService.UploadLocalFileAsync(request.FilePath, request.PublicId);

            return Ok(new
            {
                message = "Upload successful",
                url = result.SecureUrl.ToString()
            });
        }



    }
}
