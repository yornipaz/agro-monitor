-- PostgreSQL dump
-- Host: localhost    Database: vallelabs
-- ------------------------------------------------------

-- Server version: 8.3.0

-- SETUP
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Connect to the database
\c agromonitor


-- Remove default public access
REVOKE ALL ON SCHEMA public FROM public;



SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16396)
-- Name: academic_day; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.parcel (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,         -- Primary key with UUID generation
    latitude double precision NOT NULL,                        -- Latitude of the parcel
    longitude double precision NOT NULL,                       -- Longitude of the parcel
    size double precision NOT NULL,                            -- Size of the parcel
    crop_type character varying NOT NULL,                      -- Type of crop
    created_at timestamp without time zone DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at timestamp without time zone DEFAULT now() NOT NULL, -- Record update timestamp
    PRIMARY KEY (id)                                           -- Primary key constraint
);
CREATE TABLE public.activity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,          -- Primary key with UUID generation
    type character varying NOT NULL,                            -- Type of activity
    name character varying NOT NULL,                            -- Name of the activity
    date timestamp without time zone NOT NULL,                  -- Date of the activity
    duration double precision NOT NULL,                         -- Duration in hours
    parcel_id uuid NOT NULL,                                    -- Foreign key referencing Parcel table
    created_at timestamp without time zone DEFAULT now() NOT NULL, -- Record creation timestamp
    updated_at timestamp without time zone DEFAULT now() NOT NULL, -- Record update timestamp
    PRIMARY KEY (id),                                           -- Primary key constraint
    CONSTRAINT fk_parcel FOREIGN KEY (parcel_id)                -- Foreign key constraint
        REFERENCES public.parcel (id)
        ON DELETE CASCADE                                       -- Cascade delete for related activities
);
CREATE TABLE public.supply (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    quantity double precision NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE public.activity_supplies_supply (
    activity_id uuid NOT NULL,
    supply_id uuid NOT NULL,
    PRIMARY KEY (activity_id, supply_id),
    CONSTRAINT fk_activity FOREIGN KEY (activity_id) REFERENCES public.activity (id) ON DELETE CASCADE,
    CONSTRAINT fk_supply FOREIGN KEY (supply_id) REFERENCES public.supply (id) ON DELETE CASCADE
);