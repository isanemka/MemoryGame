export async function loadImages() {
    const response = await fetch('https://gist.githubusercontent.com/isanemka/080f99b1fafc080d2c79ade6578992e2/raw/3644b78d15d77e3055aa9e679eaa79e981f2cf79/images.json');
    const images = await response.json();

    return images
}