# Image Glitch

This is the simple image glitch effect implementation, based on pixel sorting algorithm

## The algorithm

1. Get pixel array
2. Get next pixel row
3. Get next pixel column
4. Set offset to 0
5. For each pixel in row, starting from offset, get its' RGB values
6. Compare each of RGB values with some threshold value
7. If RGB values satisfy condition in step 5, push them to temporary buffer and save pixel position in pixel array
8. Repeat steps 5-7, until RGB values not satisfy condition in step 5
9. Sort temporary buffer, based on kind-of luminance filter
10. Insert temporary buffer in pixel array at position, saved in step 6
11. Set offset to sum of saved pixel position and temp buffer length
12. Reset temporary buffer and saved pixel position
13. Repeat steps 5-12, until current row ends
14. Repeat steps 2-13, until all rows are sorted
15. Draw pixel array on canvas

## How to use

1. Clone repo
2. Run local server at root directory ([serve](https://www.npmjs.com/package/serve) or [Python SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html), f.e.)