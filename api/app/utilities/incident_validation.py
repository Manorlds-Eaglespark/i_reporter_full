

init_dict = {
    "created_by": "",
    "type": "",
    "location": "",
    "status": "",
    "images": "",
    "videos": "",
    "comment": ""
}


class Incident_Validation():
    def __init__(self, init_dict):
        self.type = init_dict["type"]
        self.location = init_dict["location"]
        self.status = init_dict["status"]
        self.images = init_dict["images"]
        self.videos = init_dict["videos"]
        self.comment = init_dict["comment"]

    def check_types(self):
        if not isinstance(self.location, list) or not self.location:
            return [400, "Valid location required. Location should be of type list"]
        elif not isinstance(self.images, list) or not self.images or len(self.images) < 1:
            return [400, "Add images links in this format: [a, b, c]"]
        elif not isinstance(self.videos, list) or not self.videos or len(self.videos) < 1:
            return [400, "Add video links in this format: [a, b, c]"]
        elif not isinstance(self.comment, str) or self.comment.isspace() or len(self.comment) < 4:
            return [400, "Valid comment required. Comment should be of type string"]
        else:
            return [200, "All good"]
