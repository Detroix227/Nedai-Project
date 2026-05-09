import os
import sys

# Force standard text encoding for Windows
sys.stdout.reconfigure(encoding='utf-8')

from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

# --- CONFIGURATION (Using Absolute Paths) ---
# This gets the folder where THIS script is running
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
# We go one step back (..) to get to the main project folder
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, ".."))

DATA_PATH = os.path.join(PROJECT_ROOT, "data", "raw_pdfs")
DB_PATH = os.path.join(PROJECT_ROOT, "vector_db", "chroma_db")

def create_vector_db():
    print("[INFO] System Starting...")
    print(f"[INFO] Looking for data in: {DATA_PATH}")
    
    # FIX: Force create the directory if it doesn't exist
    if not os.path.exists(DB_PATH):
        os.makedirs(DB_PATH)
        print(f"[INFO] Created missing folder: {DB_PATH}")

    # 1. Load the Data
    loader = PyPDFDirectoryLoader(DATA_PATH)
    raw_documents = loader.load()
    
    if not raw_documents:
        print("[ERROR] No PDFs found! Please put a file in 'data/raw_pdfs'.")
        return

    print(f"[SUCCESS] Loaded {len(raw_documents)} pages.")

    # 2. Split the Data
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = text_splitter.split_documents(raw_documents)
    print(f"[INFO] Split into {len(chunks)} small text chunks.")

    # 3. Embed & Store
    print("[INFO] Creating embeddings...")
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    print("[INFO] Saving to ChromaDB (this might take a moment)...")
    db = Chroma.from_documents(
        documents=chunks, 
        embedding=embedding_model, 
        persist_directory=DB_PATH
    )
    
    print(f"[SUCCESS] Database saved to '{DB_PATH}'.")
    print("Henry now remembers this information.")

if __name__ == "__main__":
    create_vector_db()