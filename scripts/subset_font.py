import os
import subprocess


def subset_font(input_path, output_path, text):
    if not os.path.exists(input_path):
        print(f"Error: Input font not found at {input_path}")
        return False

    char_list = "".join(sorted(list(set(text))))

    print(f"Subsetting font with characters: {char_list}")

    try:
        cmd = [
            "/home/xihale/.local/bin/pyftsubset",
            input_path,
            f"--text={char_list}",
            f"--output-file={output_path}",
            "--flavor=woff2",
            "--layout-features=*",
            "--no-hinting",
            "--desubroutinize",
        ]

        env = os.environ.copy()
        env["PYTHONPATH"] = "/home/xihale/.local/lib/python3.13/site-packages"

        subprocess.run(cmd, check=True, env=env)
        print(f"Successfully created subset font at {output_path}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error during subsetting: {e}")
        return False


if __name__ == "__main__":
    source_font = "/home/xihale/Downloads/unifont-16.0.04.ttf"
    target_dir = os.path.join(
        os.path.dirname(os.path.dirname(__file__)), "public", "fonts"
    )
    output_font = os.path.join(target_dir, "unifont_subset.woff2")

    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    basic_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ "
    chinese_chars = "下载推荐"

    all_chars = basic_chars + chinese_chars

    subset_font(source_font, output_font, all_chars)
