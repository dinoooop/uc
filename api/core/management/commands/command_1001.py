from django.core.management.base import BaseCommand
from django.db import connection
import random

class Command(BaseCommand):
    help = "Drop old brand column and create a new int brand column with values 2 or 3 randomly."

    def handle(self, *args, **kwargs):
        cursor = connection.cursor()

        # 1️⃣ Drop old column if exists
        self.stdout.write("Dropping old brand column (if exists)...")
        cursor.execute("""
            DO $$ 
            BEGIN
                IF EXISTS (
                    SELECT 1 
                    FROM information_schema.columns 
                    WHERE table_name = 'cars_car' AND column_name = 'brand'
                ) THEN
                    ALTER TABLE cars_car DROP COLUMN brand;
                END IF;
            END $$;
        """)

        # 2️⃣ Create new brand column (integer, nullable first)
        self.stdout.write("Creating new brand column (integer)...")
        cursor.execute("""
            ALTER TABLE cars_car 
            ADD COLUMN brand INTEGER;
        """)

        # 3️⃣ Fill with random brand_id 2 or 3
        self.stdout.write("Updating all cars with random brand IDs (2 or 3)...")
        cursor.execute("""
            UPDATE cars_car 
            SET brand = CASE 
                WHEN RANDOM() < 0.5 THEN 2 
                ELSE 3 
            END;
        """)

        self.stdout.write(self.style.SUCCESS(
            "Brand column recreated successfully and populated with random values 2 or 3."
        ))
