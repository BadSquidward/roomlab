
import streamlit as st
import pandas as pd
from PIL import Image
import requests
from io import BytesIO
import random

# Set page configuration
st.set_page_config(
    page_title="Interior Synergy",
    page_icon="🏠",
    layout="wide"
)

# Custom CSS for styling
st.markdown("""
<style>
    .main-title {
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    .sub-title {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 1rem;
    }
    .card {
        border-radius: 10px;
        border: 1px solid #e0e0e0;
        padding: 1.5rem;
        margin-bottom: 1rem;
        background-color: white;
    }
    .footer {
        margin-top: 3rem;
        padding-top: 1rem;
        border-top: 1px solid #e0e0e0;
        text-align: center;
        color: #666;
    }
    button {
        border-radius: 5px;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state variables
if 'page' not in st.session_state:
    st.session_state.page = 'home'
if 'selected_room' not in st.session_state:
    st.session_state.selected_room = None
if 'selected_design' not in st.session_state:
    st.session_state.selected_design = None
if 'designs' not in st.session_state:
    st.session_state.designs = []

# Mock data
rooms = [
    {
        "id": "living-room",
        "name": "Living Room",
        "description": "Create a welcoming space for relaxation and entertainment.",
        "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
    },
    {
        "id": "bedroom",
        "name": "Bedroom",
        "description": "Design a serene retreat for rest and rejuvenation.",
        "image_url": "https://images.unsplash.com/photo-1615874959474-d609969a20ed"
    },
    {
        "id": "kitchen",
        "name": "Kitchen",
        "description": "Craft a functional and stylish space for cooking and gathering.",
        "image_url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f"
    },
    {
        "id": "dining-room",
        "name": "Dining Room",
        "description": "Create an elegant space for memorable meals and gatherings.",
        "image_url": "https://images.unsplash.com/photo-1513694203232-719a280e022f"
    },
    {
        "id": "home-office",
        "name": "Home Office",
        "description": "Design a productive and inspiring workspace at home.",
        "image_url": "https://images.unsplash.com/photo-1593476550610-87baa860004a"
    },
    {
        "id": "bathroom",
        "name": "Bathroom",
        "description": "Transform your bathroom into a spa-like sanctuary.",
        "image_url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
    }
]

design_options = [
    {
        "id": "design1",
        "title": "Modern Elegance",
        "description": "A clean, contemporary design with sleek furniture and a monochrome palette accented with subtle color pops.",
        "image_url": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
        "tags": ["Modern", "Minimalist"],
        "price": 8500,
    },
    {
        "id": "design2",
        "title": "Scandinavian Comfort",
        "description": "A bright, airy space with light wood tones, functional furniture, and natural textiles for a cozy feel.",
        "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        "tags": ["Scandinavian", "Cozy"],
        "price": 7200,
    },
    {
        "id": "design3",
        "title": "Industrial Chic",
        "description": "An urban aesthetic with exposed elements, mixed metals, and vintage-inspired pieces for character.",
        "image_url": "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
        "tags": ["Industrial", "Urban"],
        "price": 9100,
    }
]

boq_items = [
    {"item": "Sofa", "quantity": 1, "unit_price": 1200, "total_price": 1200},
    {"item": "Coffee Table", "quantity": 1, "unit_price": 450, "total_price": 450},
    {"item": "Area Rug", "quantity": 1, "unit_price": 300, "total_price": 300},
    {"item": "Floor Lamp", "quantity": 2, "unit_price": 150, "total_price": 300},
    {"item": "Wall Art", "quantity": 3, "unit_price": 100, "total_price": 300},
    {"item": "Accent Chair", "quantity": 2, "unit_price": 350, "total_price": 700},
    {"item": "Side Table", "quantity": 2, "unit_price": 200, "total_price": 400},
    {"item": "Curtains", "quantity": 1, "unit_price": 250, "total_price": 250},
]

# Helper function to load image
def load_image(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    return img

# Navigation bar
def render_navbar():
    col1, col2, col3, col4, col5 = st.columns([2, 1, 1, 1, 1])
    with col1:
        st.markdown('<span class="main-title">Interior Synergy</span>', unsafe_allow_html=True)
    with col2:
        if st.button("Home"):
            st.session_state.page = 'home'
            st.rerun()
    with col3:
        if st.button("Design"):
            st.session_state.page = 'room_selection'
            st.rerun()
    with col4:
        if st.button("Portfolio"):
            st.session_state.page = 'portfolio'
            st.rerun()
    with col5:
        if st.button("Contact"):
            st.session_state.page = 'contact'
            st.rerun()
    st.markdown('<hr>', unsafe_allow_html=True)

# Home page
def render_home():
    st.markdown('<div class="main-title">Transform Your Space with AI-Powered Interior Design</div>', unsafe_allow_html=True)
    st.markdown("Create stunning interior designs tailored to your preferences and budget. Our AI helps you visualize and plan your perfect space.")
    
    col1, col2 = st.columns([1, 1])
    with col1:
        st.image("https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=1200", use_column_width=True)
    with col2:
        st.markdown("""
        ### How It Works
        1. **Select your room** - Choose which space you want to redesign
        2. **Share your preferences** - Tell us your style, budget, and requirements
        3. **Review designs** - Compare AI-generated design options
        4. **Generate BOQ** - Get a detailed bill of quantities for your selected design
        """)
        if st.button("Get Started", key="home_get_started"):
            st.session_state.page = 'room_selection'
            st.rerun()

# Room selection page
def render_room_selection():
    st.markdown('<div class="main-title">Select Your Room</div>', unsafe_allow_html=True)
    st.markdown("Choose the space you want to design and provide basic information. We'll generate multiple design options tailored to your preferences.")
    
    # Create a 3-column layout for room cards
    cols = st.columns(3)
    for i, room in enumerate(rooms):
        with cols[i % 3]:
            st.markdown(f"<div class='card'>", unsafe_allow_html=True)
            st.image(f"{room['image_url']}?auto=format&fit=crop&w=800&q=80", use_column_width=True)
            st.markdown(f"### {room['name']}")
            st.markdown(f"{room['description']}")
            if st.button("Select Room", key=f"select_{room['id']}"):
                st.session_state.selected_room = room
                st.session_state.page = 'design_generation'
                st.rerun()
            st.markdown("</div>", unsafe_allow_html=True)

# Design generation page
def render_design_generation():
    room = st.session_state.selected_room
    st.markdown(f"<div class='main-title'>{room['name']} Design</div>", unsafe_allow_html=True)
    st.markdown("Tell us about your preferences and we'll generate design options for you.")
    
    with st.form("design_preferences"):
        st.markdown("### Design Preferences")
        style = st.selectbox("Style", ["Modern", "Scandinavian", "Industrial", "Traditional", "Eclectic"])
        budget = st.slider("Budget Range ($)", 3000, 20000, 10000)
        color_palette = st.multiselect("Color Palette", ["Neutral", "Warm", "Cool", "Bold", "Pastel"])
        special_requirements = st.text_area("Special Requirements")
        submitted = st.form_submit_button("Generate Design Options")
        
        if submitted:
            with st.spinner('Generating design options...'):
                # In a real app, this would call an AI model
                # We'll just use the mock data for now
                st.session_state.designs = design_options
                st.session_state.page = 'design_comparison'
                st.rerun()
    
    col1, col2 = st.columns([3, 1])
    with col1:
        st.image(f"{room['image_url']}?auto=format&fit=crop&w=1000&q=80", use_column_width=True)
    with col2:
        if st.button("Back to Room Selection"):
            st.session_state.page = 'room_selection'
            st.rerun()

# Design comparison page
def render_design_comparison():
    room = st.session_state.selected_room
    st.markdown(f"<div class='main-title'>Your {room['name']} Design Options</div>", unsafe_allow_html=True)
    st.markdown("Compare different design concepts and select your favorite to proceed with detailed planning.")
    
    col1, col2 = st.columns([3, 1])
    with col1:
        if st.button("Back", key="back_to_generation"):
            st.session_state.page = 'design_generation'
            st.rerun()
    with col2:
        if st.button("Regenerate Options"):
            # In a real app, this would call the AI again
            st.toast("Generating new design options...")
    
    # Display design options
    for design in st.session_state.designs:
        st.markdown(f"<div class='card'>", unsafe_allow_html=True)
        cols = st.columns([1, 2])
        with cols[0]:
            st.image(f"{design['image_url']}?auto=format&fit=crop&w=800&q=80", use_column_width=True)
        with cols[1]:
            st.markdown(f"### {design['title']}")
            st.markdown(f"{design['description']}")
            st.markdown(f"**Tags:** {', '.join(design['tags'])}")
            st.markdown(f"**Estimated Cost:** ${design['price']}")
            if st.button("Select Design", key=f"select_{design['id']}"):
                st.session_state.selected_design = design
                st.session_state.page = 'boq_generation'
                st.rerun()
        st.markdown("</div>", unsafe_allow_html=True)

# BOQ generation page
def render_boq_generation():
    room = st.session_state.selected_room
    design = st.session_state.selected_design
    st.markdown(f"<div class='main-title'>Bill of Quantities: {design['title']}</div>", unsafe_allow_html=True)
    st.markdown(f"Review the materials and furniture needed for your {room['name']} design.")
    
    col1, col2 = st.columns([3, 1])
    with col1:
        if st.button("Back to Designs", key="back_to_designs"):
            st.session_state.page = 'design_comparison'
            st.rerun()
    with col2:
        st.download_button(
            "Download BOQ as CSV",
            pd.DataFrame(boq_items).to_csv(index=False).encode('utf-8'),
            f"{room['name']}_BOQ.csv",
            "text/csv",
            key='download-csv'
        )
    
    # Display design image
    st.image(f"{design['image_url']}?auto=format&fit=crop&w=1200&q=80", use_column_width=True)
    
    # Display BOQ table
    st.markdown("### Bill of Quantities")
    df = pd.DataFrame(boq_items)
    st.dataframe(df, use_container_width=True)
    
    total_cost = sum(item["total_price"] for item in boq_items)
    st.markdown(f"### Total Cost: ${total_cost}")
    
    if st.button("Place Order", type="primary"):
        st.balloons()
        st.success("Your order has been placed! Our team will contact you shortly.")

# Portfolio page (simplified)
def render_portfolio():
    st.markdown('<div class="main-title">Our Portfolio</div>', unsafe_allow_html=True)
    st.markdown("Explore our previous design projects for inspiration.")
    
    # This would normally display actual portfolio items
    st.info("Portfolio page is under construction. Check back soon!")

# Contact page (simplified)
def render_contact():
    st.markdown('<div class="main-title">Contact Us</div>', unsafe_allow_html=True)
    st.markdown("Get in touch with our design team.")
    
    with st.form("contact_form"):
        st.text_input("Name")
        st.text_input("Email")
        st.text_area("Message")
        if st.form_submit_button("Send Message"):
            st.success("Your message has been sent! We'll get back to you soon.")

# Main app logic
def main():
    render_navbar()
    
    if st.session_state.page == 'home':
        render_home()
    elif st.session_state.page == 'room_selection':
        render_room_selection()
    elif st.session_state.page == 'design_generation':
        render_design_generation()
    elif st.session_state.page == 'design_comparison':
        render_design_comparison()
    elif st.session_state.page == 'boq_generation':
        render_boq_generation()
    elif st.session_state.page == 'portfolio':
        render_portfolio()
    elif st.session_state.page == 'contact':
        render_contact()
    
    # Footer
    st.markdown("""
    <div class="footer">
        © 2023 Interior Synergy. All rights reserved.
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
