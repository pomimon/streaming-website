import aquatic from "Assets/aquatic.jpg";
import birds from "Assets/birds.jpg";
import critters from "Assets/critters.jpg";
import mammals from "Assets/mammals.jpg";
import pets from "Assets/pets.jpg";
import zoos from "Assets/zoos.jpg";

function createCategory(title, image, slug = title.toLowerCase()) {
  return {
    title,
    slug,
    image,
    imageAlt: `${title} Streams`,
  };
}

export const CATEGORY_CARDS = [
  createCategory("Aquatic", aquatic),
  createCategory("Birds", birds),
  createCategory("Mammals", mammals),
  createCategory("Pets", pets),
  createCategory("Critters", critters, "reptiles-and-insects"),
  createCategory("Zoos", zoos),
];

export const CATEGORY_IMAGES = {
  aquatic,
  birds,
  critters,
  mammals,
  pets,
  zoos,
};
