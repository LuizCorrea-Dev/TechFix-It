import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './Services.module.css';
import { getServices } from '@/lib/db';
import * as Icons from 'lucide-react';
import fs from 'fs';
import path from 'path';

export default async function Services() {
  const services = await getServices();

  return (
    <section className={styles.services}>
      <div className="container">
        <div className={styles.grid}>
          {services.map((service : any, index : number) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;
            
            // Validate if local image exists
            let bgImage = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop';
            
            if (service.imageUrl) {
                // Check if it's an absolute URL (http/https)
                if (service.imageUrl.startsWith('http')) {
                    bgImage = service.imageUrl;
                } else {
                    // It's a local path like /uploads/...
                    // Remove leading slash if present for path join
                    const relativePath = service.imageUrl.startsWith('/') ? service.imageUrl.slice(1) : service.imageUrl;
                    const absolutePath = path.join(process.cwd(), 'public', relativePath);
                    
                    try {
                        if (fs.existsSync(absolutePath)) {
                            bgImage = service.imageUrl;
                        }
                    } catch (e) {
                        // ignore error, fallback remains
                    }
                }
            }

            return (
            <Link key={service.id || index} href={`/services/${service.slug}`} className={styles.cardLink}>
                <div className={styles.card}>
                  <div className={styles.cardImage} style={{ backgroundImage: `url(${bgImage})` }} />
                  {/* Icon removed in favor of always showing image as requested */}
                {service.isExclusive && <span className={styles.badge}>EXCLUSIVE</span>}
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.description}>{service.shortDescription}</p>
                <span className={styles.readMore}>
                  Read More →
                </span>
              </div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
}
