using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using CloudinaryASP1.Config;

namespace CloudinaryASP1.Service
{
    public class CloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret);

            _cloudinary = new Cloudinary(account);
        }

        public async Task<List<string>> GetAllImagesAsync()
        {
            var result = await _cloudinary.ListResourcesAsync(new ListResourcesParams
            {
                ResourceType = ResourceType.Image,
                MaxResults = 100
            });

            return result.Resources.Select(r => r.SecureUrl.ToString()).ToList();
        }

        public async Task<ImageUploadResult> UploadLocalFileAsync(string filePath, string publicId)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(filePath),
                PublicId = publicId,
                Overwrite = true
            };

            return await _cloudinary.UploadAsync(uploadParams);
        }



    }
}
