import heroWedding from "@/assets/hero-wedding.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import birthdayParty from "@/assets/birthday-party.jpg";
import engagement from "@/assets/engagement.jpg";
import destinationWedding from "@/assets/destination-wedding.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import eventDecoration from "@/assets/event-decoration.jpg";

export interface PortfolioEvent {
  id: string;
  clientName: string;
  categorySlug: string;
  categoryName: string;
  coverImage: string;
  images: string[];
  description: string;
}

export const portfolioEvents: PortfolioEvent[] = [
  // Wedding Planning
  {
    id: "rams-wedding",
    clientName: "Ram & Sita's Grand Wedding",
    categorySlug: "wedding-planning",
    categoryName: "Wedding Planning",
    coverImage: heroWedding,
    images: [heroWedding, gallery1, gallery2, eventDecoration],
    description: "A majestic traditional wedding featuring elaborate floral arches, opulent reception decor, and intricate stage designs.",
  },
  {
    id: "aayush-wedding",
    clientName: "Aayush & Priya's Minimalist Wedding",
    categorySlug: "wedding-planning",
    categoryName: "Wedding Planning",
    coverImage: gallery3,
    images: [gallery3, gallery4, gallery1],
    description: "A beautiful, minimalist outdoor ceremony focusing on pastel tones and elegant simplicity.",
  },
  // Corporate Events
  {
    id: "tech-summit-2025",
    clientName: "Tech Summit 2025",
    categorySlug: "corporate-events",
    categoryName: "Corporate Events",
    coverImage: corporateEvent,
    images: [corporateEvent, eventDecoration, gallery2],
    description: "An immersive corporate gala with state-of-the-art stage setups and premium seating arrangements.",
  },
  // Birthday Celebrations
  {
    id: "aaryas-sweet-16",
    clientName: "Aarya's Sweet 16",
    categorySlug: "birthday-celebrations",
    categoryName: "Birthday Celebrations",
    coverImage: birthdayParty,
    images: [birthdayParty, gallery3, eventDecoration],
    description: "A magical balloon-themed birthday celebration with a custom photo booth and dessert tables.",
  },
  // Engagement
  {
    id: "shyam-engagement",
    clientName: "Shyam & Gita's Engagement",
    categorySlug: "engagement",
    categoryName: "Engagement",
    coverImage: engagement,
    images: [engagement, gallery1, gallery4],
    description: "A romantic and intimate ring ceremony decorated with warm fairy lights and fresh roses.",
  },
  // Destination Wedding
  {
    id: "himalayan-vows",
    clientName: "Himalayan Vows: Rohan & Maya",
    categorySlug: "destination-wedding",
    categoryName: "Destination Wedding",
    coverImage: destinationWedding,
    images: [destinationWedding, gallery4, heroWedding],
    description: "A breathtaking destination wedding set against the majestic backdrop of the Himalayas.",
  }
];

export const getEventsByCategory = (slug: string) => {
  return portfolioEvents.filter(event => event.categorySlug === slug);
};

export const getCategoryNameBySlug = (slug: string) => {
  const event = portfolioEvents.find(e => e.categorySlug === slug);
  return event ? event.categoryName : slug.replace("-", " ");
};
